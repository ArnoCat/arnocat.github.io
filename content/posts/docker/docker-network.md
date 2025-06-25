---
author: "arno"
date: 2024-08-11
linktitle: docker网络异常排查
type:
- posts/docker
title: docker网络异常排查
weight: 1
series:
- Arno's Blog
---

## docker网络异常排查

```SHELL
    $ docker pull ubuntu:22.04
    Error response from daemon: Get "https://registry-1.docker.io/v2/": EOF
```

这是一个docker的网络异常,需要检查一下网络是否正常

先用ping检测一下

```SHELL
    $ ping registry-1.docker.io  # 测试网络可达性
    PING registry-1.docker.io (3.94.224.37): 56 data bytes
    64 bytes from 3.94.224.37: icmp_seq=0 ttl=64 time=0.174 ms
    64 bytes from 3.94.224.37: icmp_seq=1 ttl=64 time=0.226 ms
    64 bytes from 3.94.224.37: icmp_seq=2 ttl=64 time=0.216 ms
```

再用curl检测一下

```SHELL
    $ curl -Iv https://registry-1.docker.io/v2/  # 检查 HTTPS 握手与证书
    * Uses proxy env variable https_proxy == 'http://127.0.0.1:7890'
    *   Trying 127.0.0.1:7890...
    * CONNECT tunnel: HTTP/1.1 negotiated
    * allocate connect buffer
    * Establish HTTP proxy tunnel to registry-1.docker.io:443
    > CONNECT registry-1.docker.io:443 HTTP/1.1
    > Host: registry-1.docker.io:443
    > User-Agent: curl/8.12.1
    > Proxy-Connection: Keep-Alive
    >
    < HTTP/1.1 200 Connection established
    HTTP/1.1 200 Connection established
    <

    * CONNECT phase completed
    * CONNECT tunnel established, response 200
    * ALPN: curl offers h2,http/1.1
    * TLSv1.3 (OUT), TLS handshake, Client hello (1):
    * Recv failure: Connection reset by peer
    * TLS connect error: error:00000000:lib(0)::reason(0)
    * OpenSSL SSL_connect: Connection reset by peer in connection to registry-1.docker.io:443
    * closing connection #0
    curl: (35) Recv failure: Connection reset by peer
```

```SHELL
    $ env | grep -i proxy
    https_proxy=http://127.0.0.1:7890
    http_proxy=http://127.0.0.1:7890

```

```SHELL
    $ unset all_proxy http_proxy https_proxy  #  禁用所有代理环境变量
    $ curl -v https://registry-1.docker.io/v2/
    * Host registry-1.docker.io:443 was resolved.
    * IPv6: (none)
    * IPv4: 198.18.8.227
    *   Trying 198.18.8.227:443...
    * ALPN: curl offers h2,http/1.1
    * TLSv1.3 (OUT), TLS handshake, Client hello (1):
    * Recv failure: Connection reset by peer
    * TLS connect error: error:00000000:lib(0)::reason(0)
    * OpenSSL SSL_connect: Connection reset by peer in connection to registry-1.docker.io:443
    * closing connection #0
    curl: (35) Recv failure: Connection reset by peer
```

发现IP是198.18.8.227，dns不对

检查 DNS 配置
请使用以下命令查看 registry-1.docker.io 的解析结果：

```SHELL
    $ nslookup registry-1.docker.io

    Server: 198.18.0.2
    Address: 198.18.0.2#53

    Name: registry-1.docker.io
    Address: 198.18.8.227
```

检查系统 DNS 配置
使用命令：

```SHELL
    $ scutil --dns
    DNS configuration

    resolver #1
    nameserver[0] : 198.18.0.2
    flags    : Request A records
    reach    : 0x00000002 (Reachable)

    resolver #2
    domain   : local
    options  : mdns
    timeout  : 5
    flags    : Request A records
    reach    : 0x00000000 (Not Reachable)
    order    : 300000

    resolver #3
    domain   : 254.169.in-addr.arpa
    options  : mdns
    timeout  : 5
    flags    : Request A records
    reach    : 0x00000000 (Not Reachable)
    order    : 300200

    resolver #4
    domain   : 8.e.f.ip6.arpa
    options  : mdns
    timeout  : 5
    flags    : Request A records
    reach    : 0x00000000 (Not Reachable)
    order    : 300400

    resolver #5
    domain   : 9.e.f.ip6.arpa
    options  : mdns
    timeout  : 5
    flags    : Request A records
    reach    : 0x00000000 (Not Reachable)
    order    : 300600

    resolver #6
    domain   : a.e.f.ip6.arpa
    options  : mdns
    timeout  : 5
    flags    : Request A records
    reach    : 0x00000000 (Not Reachable)
    order    : 300800

    resolver #7
    domain   : b.e.f.ip6.arpa
    options  : mdns
    timeout  : 5
    flags    : Request A records
    reach    : 0x00000000 (Not Reachable)
    order    : 301000

    DNS configuration (for scoped queries)

    resolver #1
    nameserver[0] : 198.18.0.2
    if_index : 11 (en0)
    flags    : Scoped, Request A records
    reach    : 0x00000002 (Reachable)
```

根据 nslookup 的结果，DNS 服务器（198.18.0.2）返回了一个保留地址 198.18.8.227。
说明：
198.18.0.0/15 是为网络基准测试保留的 IP 范围，而不是公共网络可用的地址。因此，Docker 在尝试连接 <https://registry-1.docker.io/v2/> 时，实际上连接到了一个无效的地址，从而导致 TLS 握手失败并出现“Connection reset by peer”错误。

更改 DNS 配置
请修改您的 /etc/resolv.conf 文件，使用可靠的公共 DNS 服务器（例如 Google 的 DNS：8.8.8.8 和 8.8.4.4）。可以使用如下命令编辑文件（需要 root 权限）：

```SHELL
    $ sudo vim /etc/resolv.conf

    nameserver 8.8.8.8
    nameserver 8.8.4.4

```

重新执行

```SHELL
    $ nslookup registry-1.docker.io

    Server: 8.8.8.8
    Address: 8.8.8.8#53

    Non-authoritative answer:
    Name: registry-1.docker.io
    Address: 104.244.46.85
```

重新执行

```SHELL
    $ unset all_proxy http_proxy https_proxy  #  禁用所有代理环境变量
    $ curl -v https://registry-1.docker.io/v2/
    * Host registry-1.docker.io:443 was resolved.
    * IPv6: (none)
    * IPv4: 3.94.224.37, 98.85.153.80, 44.208.254.194
    *   Trying 3.94.224.37:443...
    * ALPN: curl offers h2,http/1.1
    * TLSv1.3 (OUT), TLS handshake, Client hello (1):
    * TLS connect error: error:00000000:lib(0)::reason(0)
    * OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to registry-1.docker.io:443
    * closing connection #0
    curl: (35) TLS connect error: error:00000000:lib(0)::reason(0)
```

还是发现证书有问题
