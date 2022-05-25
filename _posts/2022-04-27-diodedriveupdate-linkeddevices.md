---
layout: post
title: Diode Drive Features - Linked Devices, Backups, and Light Zones
date: 2022-04-27 23:12
categories: [DiodeDrive]
tags: [Diode, Diode Drive, P2P]
author: Allen M
image: linked-devices.png
imageclass: top
---
Diode Drive is a [self-custody solution for your information](https://diode.io/diode%20drive/self-custody-for-data-22032/).  It gives you full control of who has access to your information and where it is stored - whether you are an individual or a company, you can use Diode Drive to maintain a secure information environment (e.g. HIPAA, GDPR, cross-geopolitical security, anti-scraping, de-google).

This post introduces recent new usability features: Linked Devices, Light Zones, and Deleted File Backups.
<hr>
# Linked Devices

A Diode Drive user often needs to access their Account from more than one device – for example, from both their laptop and their phone.  This is possible by adding additional devices as “[Linked Devices](https://support.diode.io/article/g3d42k5onu)” to an Account.

<p align="center"><img src="images/blog/linked-device-list.png"></p>

This capability is common in web applications, but since Diode Drive is a fully decentralized self-custodial solution (Diode has no access to your Account or your data), a key difference is that every user, upon signing up, should make sure to [save their Backup Code in a safe location](https://support.diode.io/article/l7noragxyj).  If their device is lost, they can restore their Account with the Backup Code and can use the restored Account to remove any devices that have been compromised.

# Light Zones

A Diode Drive Zone can be operated in [Light Zone](https://support.diode.io/article/e90ihyvxq6) mode wherein the Zone’s files are not always synchronized to the device.  This is often the desired mode for computers or phones that need access to the Zone’s information, but don’t want to store all the Zone’s files on their local storage.

Light Zone mode is default for other Linked Devices on the Account.  When a new Zone is created by one Linked Device, it will be automatically added to the other Linked Devices for the Account in “Light Zone” mode.

In Light Zone mode, the “File Syncing” Zone option is disabled. 

<p align="center"><img src="images/blog/light-zone-setting.png"></p>

Because File Syncing is disabled, the Light Zone will not automatically synchronize files in the Zone.  However, if a file is opened, the file will automatically be downloaded to the device, and if a file is added by the device in Light Zone mode, the new file will be automatically synchronized to the Zone.  All other functions (chat, file view, settings) work the same as a Zone in normal mode.  

In the Zone Picker bar, Light Zones are depicted with a non-sync icon in the lower right portion of the Zone icon.

<p align="center"><img src="images/blog/light-zone-icon.png"></p>

# Deleted File Backup

When a file is deleted from one Team Member’s device, the file is then deleted from everyone in the Zone.  This is desired when the file is actually intended to be deleted, but can cause data loss if the deletion is accidental.  As the number of Team Members grows in your Zone, the chances that someone will accidentally delete a file increases.

Diode Drive 1.4.10 and later allows a device to operate as a backup device by turning on the “[Deleted Files Backup](https://support.diode.io/article/4uxydawrq1)” setting.  When a device has this setting, any files that are deleted by other Team Members will be backed up to a backup folder on the device.  If a file was deleted accidentally, it can be restored from the backup device.

<p align="center"><img src="images/blog/deleted-files-backup.png"></p>

While normal Team Members can operate their device(s) in backup mode, Diode recommends a special [backup Team Member device be created](https://support.diode.io/article/x859ax5avc-backup-confidential-files) that is intended for that purpose.  This backup device should be located in a secure location, ideally one that has physical security and that is offsite from any normal hub of operations.  Organizations with critical data may want to operate more than one backup device, as is common in enterprise IT systems.

