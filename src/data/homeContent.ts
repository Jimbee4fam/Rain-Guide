import { ComponentDetail } from '../types';

export interface HomeSectionData {
  id: string;
  title: string;
  icon: string;
  summary: string;
  content: string;
  details?: ComponentDetail[];
}

export const WHAT_IS_RAIN = `RAIN is a field reference and radio-awareness station. It is built to help a non-expert power up the kit, identify the main parts, choose the right listening target, and follow safe receive-only SDR steps without needing Jim standing beside them.

Use this guide as the front door. Signal Stack is the SDR tuning module inside the guide. NFC tags are the physical shortcuts that teach the user what each part does and can open the right reference card.`;

export const FIRST_FIVE_MINUTES = [
  'Start with power: confirm the battery or power bank is connected, stable, and not overheating.',
  'Open RAIN Guide and read the “Do Not Touch / Receive Only” safety notes before changing anything.',
  'Choose a simple listening target first: NOAA Weather is the easiest proof-of-life signal.',
  'Open Signal Stack, search “NOAA,” then copy the frequency, mode, bandwidth, and steps into the SDR app.',
  'Use the antenna note from the preset. If the signal is weak, improve antenna position before changing random SDR settings.',
];

export const BASIC_USAGE = [
  'Power the system from the approved battery/power source only.',
  'Open RAIN Guide on the small screen, phone, tablet, Pi, or G10 browser.',
  'Use “Start Here” if you are unfamiliar with the system.',
  'Use “Scan Tag” or tap a physical NFC label to learn what a specific part does.',
  'Use Signal Stack when you want exact SDR listening directions for a band or service.',
  'Keep the system receive-only unless you are licensed, authorized, and using a separate approved transmitter.',
  'When finished, close software first, then power down the hardware cleanly.',
];

export const HANDOFF_RULES = [
  'If you are not sure what a part does, scan its tag before touching it.',
  'Do not move antenna switch positions unless a guide card tells you to.',
  'Do not transmit. This guide is for listening/reference use only.',
  'If audio is silent, check antenna, gain, squelch, and mode before assuming the SDR is broken.',
  'If something gets hot, smells wrong, or power flickers, stop and disconnect power safely.',
];

export const SAFETY_NOTES = [
  { level: 'warn', text: 'Receive-only SDR listening is the intended use. Do not transmit on aviation, marine, emergency, military, railroad, public safety, or utility frequencies.' },
  { level: 'warn', text: 'Some frequencies are sensitive, restricted, encrypted, or legally limited. Do not interfere, decode unlawfully, rebroadcast, or act on critical communications.' },
  { level: 'warn', text: 'Antennas, SDR dongles, upconverters, and RF switches can be damaged by incorrect power or transmit energy. Keep transmitters isolated from receive gear.' },
  { level: 'info', text: 'NOAA Weather is the best first test because it is continuous and easy to recognize.' },
  { level: 'info', text: 'Mode matters. AM, NFM, WFM, USB, and LSB are not interchangeable. If the mode is wrong, the signal may sound like noise.' },
  { level: 'info', text: 'Bandwidth controls how much signal you hear. Too narrow cuts audio off; too wide adds noise.' },
];

export const SYSTEM_COMPONENTS: ComponentDetail[] = [
  {
    name: 'Signal Stack SDR Guide',
    description: 'The searchable tuning reference for bands, services, and starter listening targets. It gives frequency, mode, bandwidth, step size, antenna notes, and app-specific settings.',
    howToUse: [
      'Open Signal Stack from the bottom navigation.',
      'Search by service, frequency, tag, or category.',
      'Open a preset and follow the Quick Tune Steps exactly.',
      'Use the app-specific section for SDR++, SDR#, GQRX, or DragonOS notes.',
      'Favorite the presets you use most often.',
    ],
    warnings: [
      'Signal Stack gives directions only. It does not control the SDR hardware.',
      'Preset frequencies are general references and may not guarantee local activity.',
      'Do not treat anything heard as official emergency instruction unless confirmed by proper channels.',
    ],
  },
  {
    name: 'NFC Tap-to-Learn Tags',
    description: 'Physical labels that turn RAIN into a self-teaching system. A tag can identify a part, open a preset, or show setup steps for a section of the box.',
    howToUse: [
      'Scan the tag using the NFC reader or manually enter the tag ID in Scan Tag.',
      'Read the card that opens before changing switches or cables.',
      'Use tags on antenna ports, power areas, SDR dongles, Ham It Up, HackRF storage, LoRa gear, and printed frequency cards.',
    ],
    warnings: [
      'NFC is a guide layer, not a safety interlock.',
      'If a physical label and the app disagree, stop and update the app or label before continuing.',
      'Do not attach NFC tags where heat, flexing, or RF shielding will damage or block them.',
    ],
  },
  {
    name: 'SDR Receiver',
    description: 'The software defined radio receives radio signals and sends them to software for listening and viewing. Examples include RTL-SDR, Nooelec SDR, and HackRF receive mode.',
    howToUse: [
      'Connect the SDR to the computer or Pi before opening the SDR app.',
      'Attach the correct antenna or antenna-switch output.',
      'Open Signal Stack and choose a preset.',
      'Match the preset frequency, mode, bandwidth, and step in your SDR software.',
      'Adjust gain and squelch gently until the signal becomes clear.',
    ],
    warnings: [
      'Do not transmit into an SDR input.',
      'Do not connect unknown powered RF sources directly to the SDR.',
      'Strong nearby signals may overload the receiver and make everything look noisy.',
    ],
  },
  {
    name: 'Ham It Up / HF Upconverter',
    description: 'The upconverter lets a VHF/UHF-focused SDR hear lower HF frequencies by shifting them into a range the SDR can receive.',
    howToUse: [
      'Use it only when the preset or guide says HF/upconverter is needed.',
      'Power the upconverter before expecting HF signals.',
      'Use the correct offset setting in your SDR software if required.',
      'Use a long wire or HF-capable antenna for best results.',
    ],
    warnings: [
      'Wrong offset settings will make frequencies appear in the wrong place.',
      'HF antennas can pick up static and nearby electrical noise easily.',
      'Do not leave loose antenna wires where people can trip or pull the case down.',
    ],
  },
  {
    name: 'Antenna Manifold / Switches',
    description: 'The antenna section routes different antennas to different receivers or accessories. It should be treated like a labeled patch panel, not a random switchboard.',
    howToUse: [
      'Read the label or scan the NFC tag for the switch area.',
      'Choose the antenna recommended by the Signal Stack preset.',
      'Move one switch at a time and verify the expected signal changes.',
      'Return switches to the labeled default position when done.',
    ],
    warnings: [
      'Incorrect routing can make the SDR deaf or expose it to the wrong signal path.',
      'Do not connect transmitters to the receive-only SDR path.',
      'Avoid stressing SMA connectors; they are small and can loosen if twisted hard.',
    ],
  },
  {
    name: 'Power System',
    description: 'Battery banks, DC converters, USB-C feeds, and inverter power keep RAIN running. Power stability matters more than raw capacity.',
    howToUse: [
      'Use the approved power source for the current setup.',
      'Power the display/computer first, then SDR accessories.',
      'Watch for low-voltage warnings, flickering screens, or hot converters.',
      'Shut down software before cutting power to the computer.',
    ],
    warnings: [
      'Do not mix unknown chargers, batteries, or polarity without checking first.',
      'Inverters can add RF noise. If reception is bad, try battery/DC power instead.',
      'Heat, swelling batteries, smell, or flicker means stop and disconnect safely.',
    ],
  },
  {
    name: 'LoRa / Mesh Radios',
    description: 'Mesh radios are for short text/status communications and field networking. They are separate from SDR listening.',
    howToUse: [
      'Power the node and confirm it appears in the mesh app or local display.',
      'Use labeled channels and names so users know which node they are using.',
      'Keep antennas attached before transmitting with mesh radios.',
    ],
    warnings: [
      'LoRa/mesh radios transmit; SDR presets are receive-only.',
      'Do not remove antennas from transmitting nodes while powered.',
      'Respect local rules and channel plans.',
    ],
  },
];

export const NFC_INSTRUCTIONS = [
  'Use NFC as the learning layer: tap the part, then read what it is and how to use it.',
  'Use Signal Stack tags for fast tuning cards, like NOAA, Airband, Marine 16, or HF starter bands.',
  'Use equipment tags for hardware cards, like SDR dongle, Ham It Up, antenna switch, power bank, or HackRF storage.',
  'Recommended tag format: RAIN-[AREA]-[NUMBER], for example RAIN-WX-001 or RAIN-PWR-001.',
  'In this web build, use the Scan Tag page to type a tag ID and simulate the NFC scan.',
];
