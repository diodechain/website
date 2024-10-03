---
layout: post
title: Diode Product Update - August & September
description: Diode App's updates for August and September
date: 2024-09-27 12:00
categories: [Diode, Security]
tags: [Diode, Diode Drive]
author: MNJR
image: 	assets/img/blog/Product Update.jpeg

---

The Diode team has published some great updates during the months of August and September released in Diode app v1.12.3 - 1.13.0.

**Free Zones now have access to ZTN (Web3 Regional Tunnels)**
<br><br>Due to the increasing challenges with access websites securely in many world regions, we’ve decided to enable [Diode ZTN - Web3 regional tunnels](https://app.docs.diode.io/docs/features/regional-tunnels/) - in all free Zones. This currently works on desktop operating and Android systems that have the [Brave Browser](https://app.docs.diode.io/docs/faq/why-does-the-diode-app-use-the-brave-browser-for-some-bookmarks/) installed. 

**Bookmark Updates:**
- **Detect and Repair Broken Bookmark Connections**
<br> If the user clicks a bookmark and the tunnel is not running, the app will attempt to repair the tunnel on the fly. This should eliminate the need to restart the app to get bookmark connections back.

- **“Show Address Bar” Bookmark Setting**
<br> A new checkbox allows users to show the browser’s address bar when opening a Bookmark. If checked, the URL opens in a "normal" window, with any tab using the tunnel configured for the Bookmark.

**Zone Updates:**

- **Increase Performance of Non-Sync Zones** 
<br>The team dove into non-sync Zones (e.g. if you join a Zone as a Read Only member) and improved the performance of joining and file listing capabilities, creating a more reliable process of joining as a non-sync member.

- **Increase Performance of Large Zones**
<br>Zones that contain >50 team were beginning to slow down for Owner members - the performance of these Zones has now been increased.

- **Users Can Remove Themselves From a Zone** 
<br> In Zone Settings there's now a "Leave Zone" button for users to completely remove themselves from the Zone, both unlinking the Zone and fully removing the Zone membership for the user.

- **Allow Changing Member Role When Other Transactions Are Processing** 
<br>The App now allows an admin or owner to update Member Roles even when other transactions are processing, making it much faster to modify roles as well as support modifying many member roles one after the other if desired.

**New Zone & Joining Processes:**
- **Auto Re-Direct to New Zone** 
<br>The system will now pop up a notification when it has successfully joined a Zone, allowing you to go to the new Zone or continue working.

- **Banners** 
<br> The sign up process was simplified and now shows an “onboarding banner” to prompt users to complete onboarding tasks. The "You Are Joining a Zone" banner now stays visible the entire time the new Zone is syncing until it fully appears on the side bar/Zone list.

**Other Updates:**
- **“Notification Preferences” Setting for Mobile** 
<br> Mobile now has a "Notification Preferences" setting to enable or disable push notifications for each device. Notifications are off by default, in Beta, and currently only supported on Android. A Play Store update to v1.12.10 is required.

- **Notation of Current Device**
<br> Accounts with multiple linked devices can now see which device they are currently using in the Account Details page. The device you are viewing the page from will be labeled with "(This Device)" next to it.

- **Load Exiting Account If Username is Entered** 
<br>If a user enters an existing username on the Sign Up or Log In pages, the app now loads the account directly, simplifying multi-profile switching.

- **File Copies Instead of Moving** 
<br>In the past, when you right-clicked a file on Desktop and selected "Open With Diode" when using the OS share-file function, the file clicked would be moved into the Diode Zone you selected. Now, it just copies the file to Zone you select.

- **Extend API with Polling Features** 
<br> The API has been extended to include channel team and message polling which allows remotely connected integration to “catch up” with any messages it may have missed during any outages of the connected peer.

- **Doc Link Updates** 
<br> The doc links in the app have been updated to the new https://docs.diode.io site.


**Bug Fixes** 
<br>
The team addressed various bugs such as Web2 and Web3 tunnel disruptions, file sync failures during interruptions, incorrect Zone initialization progress, un-clickable links in tooltips, lost log view on mobile after deleting logs, and CPU overconsumption during permission checks.

If you want to read more about the specifics of each update, to go our [App Versions](https://support.diode.io/category/9gss923s33-diode-app-updates-version) page and check out the specific version details.

To explore further please:
<div class="story__buttons">
  <a href="{{"https://contactdiode.paperform.co"}}" class="btn" target="">Get in Touch</a>
  <a href="#download-app" class="btn popup-open" target="">Try Diode Out</a>
</div>

