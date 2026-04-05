import * as params from '@params';

let fuse;
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let first, last, current_elem = null;
let resultsAvailable = false;

function excerpt(text) {
  if (!text) return '暂无摘要，打开文章查看完整内容。';
  return text.replace(/\s+/g, ' ').trim().slice(0, 120);
}

window.onload = function () {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        if (data) {
          let options = {
            distance: 100,
            threshold: 0.4,
            ignoreLocation: true,
            keys: ['title', 'permalink', 'summary', 'content'],
          };
          if (params.fuseOpts) {
            options = {
              isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
              includeScore: params.fuseOpts.includescore ?? false,
              includeMatches: params.fuseOpts.includematches ?? false,
              minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
              shouldSort: params.fuseOpts.shouldsort ?? true,
              findAllMatches: params.fuseOpts.findallmatches ?? false,
              keys: params.fuseOpts.keys ?? ['title', 'permalink', 'summary', 'content'],
              location: params.fuseOpts.location ?? 0,
              threshold: params.fuseOpts.threshold ?? 0.4,
              distance: params.fuseOpts.distance ?? 100,
              ignoreLocation: params.fuseOpts.ignorelocation ?? true,
            };
          }
          fuse = new Fuse(data, options);
        }
      } else {
        console.log(xhr.responseText);
      }
    }
  };
  xhr.open('GET', '../index.json');
  xhr.send();
};

function activeToggle(ae) {
  document.querySelectorAll('.focus').forEach(function (element) {
    element.classList.remove('focus');
  });
  if (ae) {
    ae.focus();
    document.activeElement = current_elem = ae;
    ae.parentElement.classList.add('focus');
  } else {
    document.activeElement.parentElement.classList.add('focus');
  }
}

function reset() {
  resultsAvailable = false;
  resList.innerHTML = sInput.value = '';
  sInput.focus();
}

sInput.onkeyup = function () {
  if (fuse) {
    let results;
    if (params.fuseOpts) {
      results = fuse.search(this.value.trim(), { limit: params.fuseOpts.limit });
    } else {
      results = fuse.search(this.value.trim());
    }
    if (results.length !== 0) {
      let resultSet = '';

      for (let item in results) {
        const result = results[item].item;
        const summary = excerpt(result.summary || result.content);
        resultSet += `<li class="post-entry search-result-item">` +
          `<header class="entry-header">${result.title}</header>` +
          `<div class="entry-content"><p>${summary}${summary.length >= 120 ? '...' : ''}</p></div>` +
          `<footer class="entry-footer">打开文章</footer>` +
          `<a href="${result.permalink}" aria-label="${result.title}"></a></li>`;
      }

      resList.innerHTML = resultSet;
      resultsAvailable = true;
      first = resList.firstChild;
      last = resList.lastChild;
    } else {
      resultsAvailable = false;
      resList.innerHTML = '';
    }
  }
};

sInput.addEventListener('search', function () {
  if (!this.value) reset();
});

document.onkeydown = function (e) {
  let key = e.key;
  let ae = document.activeElement;

  let inbox = document.getElementById('searchbox').contains(ae);

  if (ae === sInput) {
    let elements = document.getElementsByClassName('focus');
    while (elements.length > 0) {
      elements[0].classList.remove('focus');
    }
  } else if (current_elem) {
    ae = current_elem;
  }

  if (key === 'Escape') {
    reset();
  } else if (!resultsAvailable || !inbox) {
    return;
  } else if (key === 'ArrowDown') {
    e.preventDefault();
    if (ae === sInput) {
      activeToggle(resList.firstChild.lastChild);
    } else if (ae.parentElement !== last) {
      activeToggle(ae.parentElement.nextSibling.lastChild);
    }
  } else if (key === 'ArrowUp') {
    e.preventDefault();
    if (ae.parentElement === first) {
      activeToggle(sInput);
    } else if (ae !== sInput) {
      activeToggle(ae.parentElement.previousSibling.lastChild);
    }
  } else if (key === 'ArrowRight' || key === 'Enter') {
    ae.click();
  }
};
