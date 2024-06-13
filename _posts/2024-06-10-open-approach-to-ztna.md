---
layout: post
title: The Need for an Open Architecture Approach to Zero Trust Networks (ZTNA)
description: ZTNA architecture 
date: 2024-06-11 9:00
categories: [Diode, Security]
tags: [Diode, Diode Drive, Executive Protection, Security, Zero Trust, Dencentralization, Blockchain]
author: Hans Rempel, CEO diode.io
image: assets/img/blog/ZTNA Blog.jpg

---

In the rapidly evolving landscape of cybersecurity, the Zero Trust Network Architecture (ZTNA) has emerged as a pivotal strategy for securing modern networks.  

However, solutions in this [$7B industry](https://www.kuppingercole.com/research/lc80826/zero-trust-network-access) remain [costly to depoy](https://www.watchguard.com/wgrd-news/blog/high-costs-are-main-challenge-adopting-zero-trust), [inaccessible to the majority of organizations](https://techaisle.com/blog/552-zero-trust-adoption-in-the-smb-and-midmarket-drivers-challenges-and-partner-ecosystem), and suffer from a [lack of ecosystem vibrancy](https://www.forbes.com/sites/natanlinder/2023/11/29/open-technology-ecosystems-are-the-future-of-manufacturing/).  

An open architecture is needed for ZTNA to achieve its potential.

### First, what is ZTNA?

Traditional security models, like VPNs, rely on a walled-garden approach, which grants broad access once a user is inside of the "garden" (e.g. if a device has access to the local network, then all resources on the local network are accessbile to the device). This "trust anyone with physical access" method is becoming obsolete in an era where cloud services, remote work, and interconnected devices dominate. Instead, ZTNA operates on the principle of "never trust, always verify," treating every user, device, and network connection as potentially compromised until proven otherwise.

This has [many benefits](https://diode.io/blog/zero-trust-replacing-vpn) for an organization's security and the ability for team members to access information.

### The Case for Open Architecture in ZTNA 

***Flexibility and Interoperability***

An open architecture in ZTNA promotes flexibility and interoperability, which are essential for modern enterprises that operate in dynamic and evolving environments. Unlike proprietary systems that can lock organizations into a single vendor's ecosystem, an open architecture allows seamless integration with various technologies and platforms, facilitating a more adaptable and scalable security posture. This approach is critical in today's multi-cloud and hybrid work environments where seamless connectivity and security are paramount ([CrowdStrike](https://www.crowdstrike.com/cybersecurity-101/zero-trust-security/ztna/)) ([Open Systems](https://www.open-systems.com/sase/ztna/)).

***Enhanced Security through Consensus***

Leveraging blockchain technology within ZTNA frameworks can significantly enhance security.  Blockchains offer immutable information and processing states in every network participant. This shifts the attack surface onto the [highly resilient Blockchain consensus layer](https://www.mdpi.com/2076-3417/13/4/2604) and away from insider threat, social engineering attacks, and other single points of failure.  Blockchain also ensures greater trust amongst the participants, something required for cross-organizational zero trust applications. ([MDPI](https://www.mdpi.com/2079-9292/13/5/865)).

***Preventing Vendor Lock-In***

One of the significant drawbacks of traditional ZTNA solutions is the risk of [vendor lock-in, which can stifle innovation and increase costs](https://venturebeat.com/data-infrastructure/6-tips-combat-vendor-lock-in-data-gravity/). Open architecture mitigates this risk by diversifying contributors to the ecosystem. This allows organizations to choose and switch between different vendors and technologies without being tied to a limited selection of options. This freedom is crucial for maintaining a competitive edge and fostering continuous improvement in security practices ([Open Systems](https://www.open-systems.com/sase/ztna/)).

### Blockchain as Platform for Open ZTNA

Decentralized Physical Infrastructure Networks (DePIN) represent a transformative approach to building and managing physical network infrastructure using blockchain technology. Blockchain smart contracts are at the heart of a well formed DePIN network - these smart contracts [automate the business logic and the operation of a ZTNA](https://www.forbes.com/sites/forbesbusinesscouncil/2023/12/21/five-ways-to-use-smart-contracts-to-revolutionize-your-business/).  By automating control and management, DePIN offers several compelling benefits that align perfectly with the principles of ZTNA.  

Let's explore four of these benefits next:

***1. Automation and Enhanced Resilience***

DePIN ensures that the authority and management of a network is transparent and rules based.  This eliminates variance in how each node operates, resulting in a more resilient infrastructure - one that is not subject to IT administrator mistakes, insider threats, or supply chain attacks.  This automation is deployed to every part of the decentralized network - eliminating single points of failure and reduces the risk of large-scale outages or attacks. This model enhances the reliability and security of the network by ensuring that no single point of compromise can undermine the entire system ([ar5iv](https://arxiv.org/abs/2104.00460)).

An example of this in operation in another sector is a decentralized energy grid.  A decentralized grid has very simple automation rules (power in, power out) so it does not need smart contracts to operate.  However, because of the same autonmous nature of the rules, it allow individual homes to produce and trade electricity.  This reduces dependence on centralized power plants and promoting the use of renewable energy sources ([Cointelegraph](https://cointelegraph.com/explained/decentralized-physical-infrastructure-network-depin-explained)) ([Binance Academy](https://academy.binance.com/en/articles/what-is-depin-in-crypto)).

***2. Incentivizing Network Growth through Automated Rewards***

A ZTNA network is only as useful as its availability - if a ZTNA network node is not readily available to a user, the ZTNA might as well not even exist.  However, because ["Trust Broker Security is ZTNA Security"](https://diode.io/blog/trust-broker-security), traditional ZTNAs must host their nodes in Tier 4 data centers (or other similarly locked-down environments).  

When Diode's [blockchain validation capabilities](https://eprint.iacr.org/2019/579.pdf)(which mathematically secures the Trust Broker) are paired with bandwidth incentives in an open DePIN ZTNA, all of a sudden the regional availability of a ZTNA can increase by orders of magnitude.  A heterogeneous collection of third parties can now assist with network growth and availability.

In the last years, we have seen how companies like Uber and AirBnB have allowed third parties to leverage underutilized resources as a global service.  This same economic system is "baked in" with DePIN networks - it is as if the economic infrastructure deployed by Uber can now be wielded to create value from any latent participant resource.  

In a DePIN, participants, such as those providing storage space in a decentralized cloud storage network like Filecoin, are rewarded with cryptocurrency for their contributions. In a ZTNA DePIN, a core resource provided by participants are Point of Presence nodes, who are rewarded for their contributions to bandwidth in the network. This incentivization not only supports the growth and sustainability of the network but also democratizes access to infrastructure resources, allowing a broader range of stakeholders to benefit from the system ([Decrypt](https://decrypt.co/resources/what-is-depin-physical-infrastructure-blockchain)) ([Binance Academy](https://academy.binance.com/en/articles/what-is-depin-in-crypto)).

***3. Transparency and Trust through Blockchain***

One of the core advantages of integrating blockchain with physical infrastructure is the enhanced transparency and trust it provides. In a traditional ZTNA, there is a lot of trust being given to the ZTNA vendor's servers and IT administrators that the "access control lists", and other permission details, are not being tampered with or otherwise vulnerable to attack.  Group membership, for example, is [a known vulnerability for traditionally managed E2EE networks](https://www.tripwire.com/state-of-security/whatsapp-flaw-could-allow-anyone-to-sneak-into-your-private-group-chat).

In a DePIN ZTNA, the way in which the network uses blockchain data is open source, and the blockchain data itself can be explicitly proven to match the expectations of the network's users.  In an environment of [accelerating zero day breaches](https://therecord.media/zero-day-exploits-jumped-in-2023-spyware), [regional geo-political information requests](https://techcrunch.com/2024/05/08/encrypted-services-apple-proton-and-wire-helped-spanish-police-identify-activist/?guccounter=1), and [clear business model conflicts of interest](https://www.businessinsider.com/googles-business-model-is-in-conflict-with-your-privacy-2011-11), this level of transparency is crucial for maintaining trust among participants and for regulatory compliance.  

The additional ability of application-specific use cases to leverage blockchain infrastructure for logging and other event memorialization is a natural out growth of the architecture.  This can be particularly valuable in regulated industries like supply chain management and energy trading ([Cointelegraph](https://cointelegraph.com/explained/decentralized-physical-infrastructure-network-depin-explained)) ([DoomDroom](https://droomdroom.com/decentralized-physical-infrastructure-networks/)).

***4. Economic Empowerment and Community Participation***

DePIN can significantly empower local communities by enabling them to control and benefit from their infrastructure. For instance, decentralized energy grids allow homeowners to sell excess energy to their neighbors, creating a more equitable and sustainable energy ecosystem. In a ZTNA environment, individuals and enterprise can BYON (“Bring Your Own Node”) to optimize their quality of service and transparency requirements, while also contributing back to the overall network. 

This community-driven approach fosters economic empowerment and encourages innovation and entrepreneurship, especially in underserved areas ([Binance Academy](https://academy.binance.com/en/articles/what-is-depin-in-crypto)) ([DoomDroom](https://droomdroom.com/decentralized-physical-infrastructure-networks/)).

### Real-World Application: Diode's Open ZTNA Solution

Diode.io exemplifies the power of open architecture in ZTNA by leveraging a decentralized network of relay nodes to provide secure and precise communication. Diode's approach integrates Web3 principles to ensure that anyone, including enterprises, can host their own relay nodes, thus democratizing access to Zero Trust technologies. This permissionless model not only enhances security but also makes the technology accessible to a broader range of users, including those underserved by traditional cybersecurity enterprise offerings.

***Building on the Moonbeam Network***

Diode's strategic choice to build on the Moonbeam network further enhances its capabilities. Moonbeam, a smart contract platform, offers seamless cross-chain connectivity, integrating functionalities from Ethereum, Cosmos, Polkadot, and more. This alignment allows Diode to leverage an established infrastructure and positions it well within the growing ecosystem of DeFi and DePIN blockchain use cases. Moonbeam's EVM compatibility and decentralized governance model ensure that Diode's solutions remain flexible, secure, and scalable ([DiodeTM](https://diode.io/blog/diode-moonbeam-partnership)) ([Zephyrnet](https://zephyrnet.com/moonbeam-diode-collaborate-on-launch-of-depin-platform-to-replace-traditional-vpn-web2-products/)).

Sicco Naets, Head of Ecosystem Development at the Moonbeam Foundation, highlighted the significance of this collaboration: "Diode’s platform is demonstrable proof that blockchain’s core principles of decentralization and data ownership pave the way for better, more secure user-centric solutions in the real world" ([Diode](https://diode.io/blog/diode-moonbeam-partnership)).

***Open ZTNA Customer Benefits***

By embracing open architecture and blockchain integration, Diode's solution addresses several critical challenges inherent in traditional ZTNA models:

- **Eliminating Vendor Lock-In:** Diode's open-source framework allows organizations to avoid being locked into limited options from a single vendor, providing the flexibility to adapt and evolve their security strategies as needed.

A growing number of application providers have deployed and are building on the Diode Network.

- **Enhancing Security through Decentralization:** The decentralized nature of Diode's network mitigates the risks associated with centralized control and single points of failure.

Diode's (https://diode.io/download#node)[Lite Node] makes it possible for anyone to contribute to the network.

- **Promoting Transparency and Trust:** By using blockchain to anchor key parts of the network definitions, Diode ensures that network participants are tamper-proof and auditable on an application-specific basis, thereby fostering greater trust among users.

- **Increasing Accessibility:** Diode’s unique implementation of application- sponsorship for secure bandwidth creates a marketplace dynamic for network resources. This reduces the cost and increases the accessibility of the ZTNA solution for all types of businesses and organizations.

The [Diode Foundation's Bandwidth Growth Program](https://diode.foundation/docs/programs/bandwidth_growth_program.html) is an example of a third party inititave that increases accessibility of zero trust network security around the world.

### Benefits to Organizations of Adopting Open ZTNA Products

***Achievable***

A core impact of open ZTNAs is that they become achievable to implement by any organization.  This is primarily because of two reasons:

1 - **Commodity pricing**: As opposed to [high take-rates from corporate networks](https://www.alphaquery.com/stock/ZS/fundamentals/annual/gross-margin), an open, permissionless ZTNA operates on a market-based system where ZTNA node providers create network capacity based on whatever the market will support.  This economic dynamic produces affordable access to ZTNA services in every region and shifts value creation to the applications the users need.

2 - **Applications on top**: According to McKinsey, the [vast majority of businesses prefer to buy products, not services](https://www.mckinsey.com/capabilities/risk-and-resilience/our-insights/securing-small-and-medium-size-enterprises-whats-next).  An open ZTNA can be extended and integrated by partners and third parties who offer value-added tools and SaaS applications that inherently leverage the network.

These advantages allow an iterative adoption by organizations, and focus value creation on user applications and organizational integrations.

***Better Access***

As discussed above, a open ZTNA network allows third parties to deploy parts of the network infrastructure that can be used by anyone with the same core security guarantees as the whole network.  When coupled with an incentive structure, this creates network access points in every region that has network demand.  This can result in far better regional access than [industry leading corporate ZTNAs](https://trust.zscaler.com/zscaler.net/data-center-map).

Better regional access translates into better security and better performance.  Any team members using the ZTNA who are located in a particular region will be able to access the nearest regional access point - thereby keeping the communications in-region instead of requiring regional-to-regional communications travel back to the nearest Tier 4 data center and then back again to the adjacent team member or asset.

***Better Security***

An open ZTNA architecture improves on the [benefits of traditional ZTNA](https://diode.io/blog/zero-trust-replacing-vpn), while removing its number one vulnerability - [the ZTNA itself](https://diode.io/blog/trust-broker-security).  Since [supply chain attacks are a growing concern](https://cyberint.com/blog/research/recent-supply-chain-attacks-examined/), every organization must include in their evaluation the security of the ZTNA provider itself.  With an open ZTNA, the source code of the system can be audited, and organizations can select a "multi-tenant" or "self-hosted" model, or any mixture in between, that suits the organization's goals.

As we've [written in the past](https://diode.io/blog/zero-trust-replacing-vpn), adopting a ZTNA architecture offers organizations numerous benefits to the security and access to information. [According to Zscaler](https://www.zscaler.com/resources/security-terms-glossary/what-is-zero-trust), "a well-tuned zero trust architecture leads to simpler network infrastructure, a better user experience, and improved cyberthreat defense".  These benefits can, first and foremost, mitigate data breaches:

- The [majority of breaches involve unintentional disclosure by an organization's own team members](https://www.verizon.com/business/en-gb/resources/reports/dbir/).  John Kindervag, who coined the term "Zero Trust", emphasizes the intentionality that Zero Trust brings to IT security: "Trust is never implicit and never implied." ([Cimcor File Integrity Monitoring](https://www.cimcor.com/blog/zero-trust-architecture-benefits)). This principle, combined with the transparency and granularity provided by open ZTNA, enables organizations to reduce unintentional information and asset exposure.

- A further [17% of breaches stem from vulnerabilities in web applications](https://www.ptsecurity.com/ww-en/analytics/web-vulnerabilities-2020-2021/).  ZTNA allows you to leave web applications in place, but to remove them from the public Internet where their vulnerabilities can be attacked.

- Many other types of breaches can also be mitigated by ZTNA.  Historically, adopting ZTNA can significantly reduce security incidents and improve data protection. A report by SecureWorld states that organizations adopting ZTNA experienced 30% fewer security incidents and 40% less severe breaches compared to traditional security models ([SecureWorld](https://www.secureworld.io/industry-news/benefits-zero-trust-architecture)).

### Conclusion

The shift towards an open architecture for ZTNA is not just a technological preference but a strategic imperative for the future of Zero Trust.  Leveraging blockchain technology as a core building block for open ZTNA secures the network itself and provides the scale, affordability, transparency, security, and innovation needed to address the complex and evolving cybersecurity landscape. 

As organizations continue to navigate the challenges of digital transformation, adopting an open, decentralized approach to Zero Trust will be crucial in building resilient and future-proof networks.

### References

**CrowdStrike**: "What is Zero Trust Network Access (ZTNA)? Zero Trust Network Access Explained" - https://www.crowdstrike.com/cybersecurity-101/zero-trust-security/ztna/

**Zscaler**: "What Is a Zero Trust Architecture? Understanding the Need for Zero Trust Architecture" - https://www.zscaler.com/resources/white- papers/zero-trust-architecture.pdf

**MDPI**: "Enhancing Zero Trust Models in the Financial Industry through Blockchain Integration: A Proposed Framework" - https://www.mdpi.com/1999-4893/14/2/76

**Open Systems**: "What is Zero Trust Network Access (ZTNA)? Providing Secure Access to Anyone Anywhere" - https://www.open- systems.com/solutions/zero-trust-network-access-ztna/

**arXiv**: "Augmenting Zero Trust Architecture to Endpoints Using Blockchain: A State-of-The-Art Review" - https://arxiv.org/abs/2104.00460

**Cointelegraph**: "Decentralized physical infrastructure network (DePIN), explained" - https://cointelegraph.com/news/decentralized-physical- infrastructure-network-depin-explained

**Decrypt**: "What is DePIN? Bringing Physical Infrastructure to Blockchain" - https://decrypt.co/69917/what-is-depin-bringing-physical-infrastructure- to-blockchain

**DroomDroom**: "Guide to DePIN: Decentralized Physical Infrastructure Networks" - https://droomdroom.com/guide-to-depin-decentralized- physical-infrastructure-networks/

**Binance Academy**: "What Is DePIN in Crypto?" - https://academy.binance.com/en/articles/what-is-depin-in-crypto

**Diode.io**: "Diode and Moonbeam Partnership" - https://diode.io/blog/diode-moonbeam-partnership

**Copenhagen INK**: "Diode and Moonbeam Collaborate on DePIN Platform for Zero Trust Network Access (ZTNA)" - https://cph-ink.dk/diode-and- moonbeam-collaborate-on-depin-platform-for-zero-trust-network-access- ztna/

**Plato Data Intelligence**: "Moonbeam, Diode Collaborate On Launch Of DePIN Platform" - https://platodata.io/moonbeam-diode-collaborate-on- launch-of-depin-platform/

**SecureWorld**: "Realizing the Benefits of Zero Trust Architecture" -https://www.secureworld.io/realizing-the-benefits-of-zero-trust- architecture

**Tripwire**: "5 Long-term Benefits of Adopting Zero Trust Architecture" -https://www.tripwire.com/state-of-security/security-data-protection/5- long-term-benefits-of-adopting-zero-trust-architecture/

**Zscaler**: "What is Zero Trust Security? Principles & Benefits" -https://www.zscaler.com/blogs/research/what-zero-trust-security- principles-benefits

**Cimcor**: "5 Zero Trust Architecture Benefits You Can't Afford To Miss" -https://www.cimcor.com/blog/5-zero-trust-architecture-benefits-you- cant-afford-to-miss

To explore further please:
<div class="story__buttons">
  <a href="{{"https://contactdiode.paperform.co"}}" class="btn" target="">Get in Touch</a>
  <a href="#download-app" class="btn popup-open" target="">Try Diode Out</a>
</div>
