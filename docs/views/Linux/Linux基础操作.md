---
title: Linux基础操作
date: 2020-09-23 
sidebar: auto
tags:
 - Linux
 - DNS服务
 - HTTP服务
 - 防火墙
categories:
 - Linux
---
> ### 任务
>
> ①熟悉查看服务器硬件配置如 CPU规格及数量 ,内存大小, 硬盘空间, 分割区 
>
> ②熟悉文件操作: 文件重命名, 移动, 复制 ,压缩 ,删除 ,查找, 更改存取权限 
>
> ③熟悉服务器设定调整: IP设定, 防火墙设定 
>
> ④熟悉服务器基楚服务: DNS服务, HTTP服务

### **1.0  熟悉服务器硬件配置**

- ```uname -a ：```查看本机系统架构。
- ```nmcli dev show :```查看MAC，IP，DNS等信息。
- ```ifconfig  :``` 查看IP等。
- ```netstat -rn  :```查看网关。
- ```service - -status-all ：```查看服务启动状态。
- ```sudo su-  :```进入root权限。
- ```pwd    :```显示当前路径。
- ```df -h    :```查看磁盘空间等信息。
- ```cat   ：```显示文件内容打印在terminal中。
- ```cat /proc/cpuinfo | grep “physical id” | sort | uniq | wc -l  ：```查看物理cpu个数。
- ```cat /proc/cpuinfo | grep “cpu cores” | uniq  ：```查看物理cpu的核数（core）。
- cat /proc/cpuinfo | grep “processor” | wc -l  ：查看逻辑cpu的个数。<!--总核数 = 物理cpu个数 X 每颗物流cpu的核数。总逻辑cpu数= 物理cpu个数 X 每颗物理cpu的核数X 超线程数-->
- `ps -ef ：`查看服务器进程状态。或者 ps aux 。
- `top   ：`查看进程占用的资源。ls
- `kill -9 PIDnunber ：`干掉进程。或者 pkill process_name
- `free -h   :`查看内存和swap使用的情况。
- `nice -n -20 ./my_bash.sh :`调整进程优先级(nice值的范围从-20到+19，正值表示低优先级，负值表示高优先级）
- `>/dev/null   :`重定向。（/dev/null代表linux的空设备文件，所有往这个文件里面写入的内容都会丢失，俗称“黑洞”。这条命令的作用是将标准输出1重定向到/dev/null中，那么执行了>/dev/null之后，标准输出就会不再存在。>表示输出重定向>>输出重定向来向文件尾部增加输出记录）。

### 2.0 **文件操作**

- `mv file1 file2 :`文件或者目录重命名,把file1重命名file2。

- `du file   :`查看文件file的大小。

- `ls ./ | wc -l :`查看当前目录下文件数。

- `wc -l file  : `查看文件行数

- `ls -lR | grep “^-” | wc -l   :`查看当前目录下文件数量（包含子目录中的文件，但不包含子文件夹数目）ls的-R参数代表包含子目录;  grep "^-"表示仅匹配行首的“-”字符。

- ` ls -lR | grep “^d” | wc -l :` 查看某文件夹下文件夹的个数，包括子文件夹里的, rep "^d"表示仅匹配行首的“d”字符，ls -l出来的文件夹行首为"d"字符。

- `mkdir -p  :`新建多级目录。

- `nautilus ~/  :`打开文件夹窗口。

-  `find ./ -name rostopic ：`在当前文件夹及其子目录下查找rostopic文件

- `find ./ -iame rostopic ：`不区分名称rostopic的大小写

- ` find / -name *rostopic* ：`模糊查找

- `find / -name rostopic  ：`在根目录下查找

- `find ./ -mtime 1 -type f -print ：`查看当前路径下24小时内修改过的regular file文件。

- `find ./ -mtime 2 -type f -print  ：`查看当前路径下48小时内修改过的regular file文件。

- `find ./ -type d ：`查找当前路径下的所有子文件夹

- ` find ./ -type f  ：`查找当前路径下所有文件（包括子文件夹下的文件）

- `grep -rin “文件内容” ./  :`查找文件内的关键字，（r：递归查找文件夹下所有文件，i:忽略大小写， n：显示查找到的行号，“文件内容”：需要查找的文本， ./:查找的目n录。）

- `tail -n  ：`查找文件的后几行，显示在terminal中，n:显示n行。

- `tar -z  :`压缩格式gzip ，文件后缀名.gz  。

- ` tar -j  :`压缩格式bzip ，文件后缀名.bz  。

-  `tar -J  :`压缩格式   ，文件后缀名xz 。

- `tar -tf test.tar.gz :`查看压缩文件内封存的信息 -<!--t：列出内容，-f：用封装文件。-->

- `tar -zxvf test.tar.gz :`解压缩文件内的信息-<!--z ：为zgip，-v ：详细列出已处理的文件-->

- `tar -zxvf test.tar.gz -C 目的文件夹 ：`解压到指定目录。目的目录必须存在 ，否则不会新建。<!---z ：表示解压gzip格式压缩文件夹。-->

- ` tar -jxvf test.tar.gz :`解压bzip2. <!---j ：表示使用bzip-->

- `tar -xvf test.tar.gz :`解压缩文件。

- `tar -cJvf test.tar.xz ./file1 ./file2 :`tar.xz表示是两级压缩文件（压缩后文件费处小，如果需要压缩多个文件，只需要在后面异常写出即可）

- 两级压缩可以分两步进行解压：①`xz -d *.tar.xz `将*.tar.xz解压成*.tar;②用`tar xvf.tar`解包。

- 也可以一步解压：`tar -Jxvf *.tar.xz`。

- `zip -r test.zip test :`压缩成文件。

- `unzip test.zip -d 指定目录 ：`解压缩到指定目录。

- `diff file1.txt file2.txt :`比较两个文本文件的差别<!--输出结果：<tile1.txt中有，但file2.txt中没有的文字；>file2.txt中有，但是file1.txt中没有的文字-->

- `file testfile  ：`查看可执行文件的硬件架构

- `ldd testfile  ：`查看可执行文件依赖的库命令

### 3.0 **IP设定，防火墙设定**

* 图形化配置网络信息：
  1. `nmcli d :`查询网卡名称；
  2. `nmtui edit 网卡名称 ：`进入设置界面；
  3. `systemctl restart network  :`重启服务；
  4. `ip addr   ：`查看IP情况；

* 命令配置网络信息：
  1. `cd /etc/sysconfig/network-scripts/`
  2. `vi ifcfg -网卡名称`
  3. `service network restart :`重启服务。
* 防火墙相关配置
  1. firewalld 的操作只有重启之后才有效：`service firewalld restart `重启。
  2. 系统配置目录/usr/lib/firewalld/services，目录中存放定义好的网络服务和端口参数，系统参数，不能修改
  3. 用户配置目录：/etc/firewalld/
* `firewall-cmd --permanent --add-port=9527/tcp ：`命令的方式添加端口，参数介绍：
  1. `firewall-cmd：`是Linux提供的操作firewall的一个工具；
  2. `--permanent：`表示设置为持久；
  3. `--add-port：`标识添加的端口；另外，firewall中有Zone的概念，可以将具体的端口制定到具体的zone配置文件中。 例如：添加8010端口： firewall-cmd --zone=public --permanent --add-port=8010/tcp（--zone=public：指定的zone为public；）
* `systemctl start firewalld:`  启动,`systemctl enable firewalld `# 开机启动`systemctl stop firewalld:` 关闭`systemctl disable firewalld:` # \取消开机启动`service firewalld restart: `重启
* ` firewall-cmd --state ：`查看firewall的状态 systemctl status firewalld
* `firewall-cmd --list-all  ：`查看防火墙规则
* centos切换成iptables防火墙切换到iptables首先应该关掉默认的firewalld，然后安装iptables服务
  1. `systemctl stop firewalld: `# 关闭
  2. `yum install iptables-services:` *安装iptables防火墙
  3. `vi /etc/sysconfig/iptables  ：`编辑iptables防火墙配置

```配置文件：
`Firewall configuration written by system-config-firewallManual customization of this file is not recommended.*filter:INPUT ACCEPT [0:0]:FORWARD ACCEPT [0:0]:OUTPUT ACCEPT [0:0]
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
-A INPUT -p icmp -j ACCEPT-A INPUT -i lo -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
-A INPUT -j REJECT --reject-with icmp-host-prohibited
-A FORWARD -j REJECT --reject-with icmp-host-prohibitedCOMMIT`
```

* COMMIT保存退出后`service iptables start: `开启`systemctl enable iptables.service :`设置防火墙开机启动

### 4.0   **服务器基础服务**

* 关闭Linux防火墙命令：`service iptables stop / service firewalld stop`  查看Linux防火墙状态命令：`service iptables status / service firewalld status`

* ssh服务相关

  1. 查看SSH服务状态信息systemctl status sshd.service   通过状态可以看到Active 状态，是否正在运行，运行了多久等，以及最近的几条链接信息
  2. 查看SSH当前占用的端口 `sudo netstat -atlunp | grep sshd`
  3. 查看SSH的配置文件
     1. 进入SSH 的目录 cd /etc/ssh
     2. 打开配置文件 vi ssh_config
  4. 修改SSH端口
     1. 修改ssh_config 文件，指定端口为其它端口 port=你想指定的端口
     2. 重启ssh 服务`systemctl restart ssh.service`

* 安装mariadb时，提示该包被mysql 所取代，一个命令：`yum remove mysql-libs`解决清除之前安装过的依赖即可

  

  

  

  



















  

  

  

  

  

  















