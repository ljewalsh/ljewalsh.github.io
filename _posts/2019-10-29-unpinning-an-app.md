---
layout: post
title: "Disabling certificate pinning using frida and charles"
date: 2019-10-29
---

There is a company operating in my hometown that I really dislike. I won't name them or go into too much detail about what they do for fear of them going after me (they are that kind of company). Let's just say that this company has a monopoly over a particular service, and they use this position of power to threaten people into paying them unfair amounts of money.

This company has a phone app which you can use to pay for their service and recently I had a go at sniffing the requests. The app uses certificate pinning which means that you cannot use your own certificate when making requests. After playing around with some tools I managed to disable the pinning so that I could view the requests that they were sending. This revealed some pretty interesting stuff, including a potential security flaw in their payment method (which
I will go into later). 

I have no plans to abuse what I have found. It just makes me feel good to crack their security (kind of like knowing one of your bully's embarressing secrets but deciding to keep it to yourself). This method, however, is pretty useful for a bunch of things (such as making an android version of an iOS app, or keeping black-box testing out of your production code) so I thought I'd outline the process I used for others who'd like to learn.

<h2>What you'll need</h2>

<ul>
<li>A rooted phone</li>
<li>A copy of the <a href="https://www.charlesproxy.com/">Charles Web Debugging Proxy App</a></li>
<li>The <a href="https://developer.android.com/studio/command-line/adb?gclid=EAIaIQobChMIoPHAkbXA5QIVCSQrCh280AMZEAAYASAAEgKdKvD_BwE">adb</a> command-line tool installed on your computer</li>
<li>The latest version of <a href="https://github.com/frida/frida/releases">frida-server</a> (make sure you download the server and not the dev kit or tools)</li>
</ul>

<h2>Setitng up Frida on your phone</h2>

Once you've downloaded and installed the above tools, you will need to setup frida on your phone. 

Frida is a tool that allows you to inject snippets of JavaScript into native apps on Windows, macOS, Linux, iOS, Android, and QNZ. Basically it injects the Google v8 engine into whatever process you have identified, allowing you to hook into functions and change what they do while they are running. If you've used <a href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/">Greasemonkey</a> or <a
href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en">Tampermonkey</a> for on-the-fly changes to a web page then you may be familiar with this idea.

Setting up frida is pretty easy:
<ul>
<li>
First, <a href="https://developer.android.com/studio/debug/dev-options">toggle the developer settings</a> on your phone and make sure Android Debugging is enabled (you can also connect to your phone over the network using the 'adb connect' command if you do not have a USB cable handy) 
</li>
<li>Open a terminal and type <div class="code">adb devices</div> to confirm your device is available:
<img src="../assets/images/posts/adb-devices.png"/>
</li>
<li>Make sure adb is running as root by running <div class="code">adb root</div></li>
<li>Use the 'adb push' command to push frida-server to your phone:
<img src="../assets/images/posts/adb-push.png"/>
</li>
<li>Change the permissions of the server using <div class="code">adb shell chmod 755 /data/local/tmp/frida-server</div></li>
<li>Confirm the version of frida-server matches what you installed using <div class="code">adb shell /data/local/tmp/frida-server --version</div>
</li>
</ul>

Once frida is on your phone, you need to downgrade SELinux to "Permissive":
<img src="../assets/images/posts/setenforce.png"/>
