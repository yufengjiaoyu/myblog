---
title: Acitvity跳转
date: 2021-02-27
sidebar: auto
tags:
 - 安卓
 - Activity跳转

categories:
 - Android
---


一，显示跳转

①新建一个MainActivity2，在AndroidManifest.xml中进行注册；
在MainActivity的</activity>结尾处并排加入以下；
<activity android:name=".MainActivity2">
</activity>


 ②在xml文件里放一个操作跳转的button。

在onCreate方法里，或者新建的方法中（新建的方法要在onCreate方法中设置自启动）
通过id找到button并设置单击i监听，添加意图