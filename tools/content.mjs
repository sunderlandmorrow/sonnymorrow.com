// All site content lives here. Edit this file, then run:  node tools/build.mjs
//
// Each project has chapters. A chapter's `blocks` is a list of:
//   "a string"            → a paragraph
//   ["a.jpeg", "b.jpeg"]  → a photo group (1 = full width, 2 = side by side, 3+ = grid)
//   { note: "..." }       → a small italic aside
//   { stack: ["a.jpeg", "b.jpeg"] } → photos one above the other, each full width
// Photos live in /images.

export const site = {
  name: 'Sonny Morrow',
  domain: 'sonnymorrow.com',
  // Set to true once you own the domain and its DNS points at GitHub Pages.
  // While false, no CNAME file is written, so the site works at any address.
  useCustomDomain: true,
  tagline: 'Earth, brick & iron — built by hand.',
  intro:
    'Hi, I\'m Sonny Morrow, a mechanical engineer working in the medical device industry. I\'ve always enjoyed working with my hands and bringing ideas to life. Whether designing, building, modifying, or restoring, I approach every project with curiosity and an obsession for detail. I\'m not afraid to rethink an approach or start over if that\'s what it takes to get things right. For me, the satisfaction is in the process just as much as the finished product.',
  // Home-page collage. Each tile links to its project.
  // The first tile is a wide "design vs. built" pair across the top row.
  collage: [
    {
      project: 'airstream-pavilion',
      pair: [
        { image: 'pavilion-dwg-overview-crop.png', label: 'SolidWorks drawing' },
        { image: 'pavilion-angle.jpeg', label: 'Built — timber pavilion', pos: '50% 62%' },
      ],
    },
    { image: 'pic01.jpeg', project: 'earthbag-dome', label: 'Adobe Tea House in Grass Valley, CA', pos: '6% 60%' },
    { image: 'airstream-interior-white-oak-floor.jpeg', project: 'airstream-safari-1960', label: '1960 Airstream', pos: '50% 60%' },
    { image: '2.35.jpeg', project: 'mercedes-300d', label: '1984 Mercedes 300D', pos: '50% 55%' },
  ],
  heroImage: 'pic01.jpeg',
  video: 'https://www.youtube.com/watch?v=Dcu71gSOogg&t=421s',
};

// Each project can set  section: 'professional'  — anything else shows under Personal projects.
// Banners and home-page cards show the whole photo. Set  heroFit: 'crop'  or  coverFit: 'crop'
// (with heroPos / coverPos to aim it) to fill the space by cropping instead.
export const projects = [
  {
    slug: 'earthbag-dome',
    title: 'Adobe Tea House',
    kicker: 'Earth architecture',
    summary:
      'A 12\' diameter adobe dome I designed and built after an architecture apprenticeship at CalEarth Institute — now hosting guests as a tea house on Airbnb Experiences.',
    cover: 'pic01.jpeg',
    hero: 'pic01.jpeg',
    meta: [
      ['Location', 'Grass Valley, CA'],
      ['Method', 'Earthbag / superadobe'],
      ['Diameter', '12 ft'],
      ['Role', 'Design & build'],
    ],
    intro: [
      'This is a dome I designed and constructed after my apprenticeship at Cal-Earth Institute. It now serves as a tea house offered on Airbnb Experiences in Grass Valley, CA. Help with labor came from generous friends and family members.',
    ],
    chapters: [
      {
        title: 'Design',
        blocks: [
          'First, I drew a floor plan and a sectional view, and built a scaled-down model of the dome.',
          ['2.jpeg', '3b.jpeg'],
          ['1b.jpeg', '2b.jpeg', 'dome-model.jpeg'],
        ],
      },
      {
        title: 'Footing',
        blocks: [
          'Then it was time to build the full-scale structure. The first step was to use a compass system to draw the footing of the dome and then dig it out.',
          ['3.jpeg', '4.jpeg'],
        ],
      },
      {
        title: 'Earthbag walls',
        blocks: [
          'The construction method uses three main materials: polypropylene bags, barbed wire, and an earthen mix. The bags come on a continuous roll and can be cut to any length. Each layer is filled with a set ratio of clay and sand, then tamped flat with a cast-iron tamper. Bags are filled in place on the structure using small containers about the size of a coffee can. Barbed wire goes between each layer to provide friction as well as tensile strength.',
          'The first few layers are filled with ¾-inch gravel so water doesn’t collect around the footing during the rainy season. Layers are then stacked and tamped flat, each one placed precisely according to the compass system.',
          ['1d.jpeg'],
        ],
      },
      {
        title: 'The compass',
        blocks: [
          'I built a model of the compass system to help people understand how the dome is geometrically conceived. The first few layers are exactly 12 feet in diameter — essentially a cylinder. A 6-foot chain attached to a pole at the center acts as a compass to keep every layer perfectly circular.',
          'At a chosen layer, the circumference begins to shrink. How much it shrinks is dictated by the second compass on the right. That measurement is transferred to the center compass so it can sweep all 360°. The compass is recalibrated every layer until, ultimately, a dome is formed.',
          ['44o.jpeg'],
        ],
      },
      {
        title: 'Openings & arches',
        blocks: [
          'Temporary forms made from recycled materials are set into the walls. These are removed later to make way for windows and a door.',
          ['2d.jpeg', '3d.jpeg'],
          'Around the openings only, the bags are filled with a cement-stabilized earthen mix, so permanent arches remain once the forms come out.',
          ['6b.jpeg'],
        ],
      },
      {
        title: 'Closing the shell',
        blocks: [
          'The final layers are filled and tamped flat, completing the shell of the structure.',
          ['1j.jpeg', '2j.jpeg'],
        ],
      },
      {
        title: 'Exterior finish',
        blocks: [
          'With the shell complete, the long stretch of finish work began — first a rough coat of cement-based plaster, then a smooth second coat.',
          ['1k.jpeg', '2k.jpeg', '3k.jpeg'],
          'I also added steps up the side of the dome.',
          ['ak.jpeg'],
          'Next I installed a standard-size door and three Roman-arch windows, then masked everything off for paint. The paint is an elastomeric — essentially a rubberized coating that keeps rain from penetrating the dome.',
          ['8k.jpeg', 'ik.jpeg'],
          'Above the door there was an empty space, which I filled with brown bottles mortared together. At night the light inside shines through the bottles and the whole wall glows.',
          ['6gk.jpeg', 'test.jpeg'],
        ],
      },
      {
        title: 'Interior',
        blocks: [
          'Inside, I started with a rough coat of clay, straw and sand plaster, followed by a rough coat of lime plaster. These coats aren’t meant to look good — the more texture, the better the next layers adhere.',
          ['1o.jpeg', '2o.jpeg', '3o.jpeg'],
          'The last coat was a smooth layer of lime plaster.',
          ['4o.jpeg'],
          'To make the dome more welcoming I added a few modern amenities: electricity for a ceiling fan and overhead light, a single outlet set into the floor, a tile floor — and a custom wood-burning stove, which became its own project.',
          { link: 'rocket-stove', text: 'See the rocket stove build' },
          ['4.12.jpeg', '5o.jpeg'],
        ],
      },
      {
        title: 'Finished',
        blocks: [
          'From the bare earthbag shell, before any plaster went on, to the finished tea house:',
          { stack: ['dome-shell-before-plaster.jpeg', 'dome-finished-exterior.jpeg'] },
          ['dome-finished-interior.jpeg', 'dome-finished-stove.jpeg'],
          ['dome-finished-bench.jpeg', 'dome-finished-doorway.jpeg', 'dome-finished-ceiling.jpeg'],
        ],
      },
    ],
    outcome:
      'The dome now works beautifully as a tea house. It’s a truly unique space, and guests always leave wondering about its unusual construction. A popular YouTube channel asked to film a short piece about it.',
    video: { id: 'Dcu71gSOogg', start: 421 },
  },

  {
    slug: 'mercedes-300d',
    title: 'Mercedes 300D',
    kicker: 'Mechanical restoration',
    summary:
      'A tired 1984 Mercedes-Benz 300D with 230,000 miles, purchased from its original owner. I pulled the engine and transmission, completely refurbished both, and brought the car back to life.',
    cover: '2.1.jpeg',
    hero: '2.1.jpeg',
    meta: [],
    intro: [
      'I picked up this 1984 Mercedes 300D for a low price. The body and interior were in great shape, but the mechanicals needed a lot of work. The engine leaked oil from many places — parking it meant a permanently stained driveway.',
      'The goal was to completely refurbish the engine and track down any further repairs needed to make the car reliable.',
    ],
    chapters: [
      {
        title: 'Pulling the engine',
        blocks: [
          'Some of the gaskets can only be replaced with the engine out, so out it came.',
          ['2.3.jpeg'],
          'Before touching the engine, I cleaned 30+ years of caked-on oil out of the engine bay and installed a new hood insulation pad.',
          ['2.5.jpeg', '2.6.jpeg'],
        ],
      },
      {
        title: 'Teardown & cleanup',
        blocks: [
          'With a clean home for the engine to return to, I mounted the engine on a stand, did a first round of degreasing, removed the extraneous parts, and labeled every single nut, bolt and screw.',
          ['2.8.jpeg', '2.8.1.jpeg', '2.7.jpeg'],
          'Every removed part was cleaned thoroughly. I also pulled the transmission after learning the engine is easier to reinstall with the transmission attached. Here are all the parts to be reused, cleaned up as well as possible:',
          ['2.9.jpeg', '2.10.jpeg'],
          'The engine, all cleaned up:',
          ['2.11.jpeg', '2.12.jpeg'],
          'I wanted the engine to look as good as it ran, so I painted it with black engine enamel — the original paint had worn away over the years.',
          ['2.14a.jpeg'],
        ],
      },
      {
        title: 'The bottom end',
        blocks: [
          'Next: replace the rear crankshaft seal and inspect the rod and main bearings for wear. First I removed the oil pump and the camshaft sprocket.',
          ['2.14.jpeg', '2.15.jpeg'],
          'Removing the main and connecting-rod bearing caps:',
          ['2.17.jpeg'],
          'With the caps off, the crankshaft could come out.',
          ['2.18.jpeg', '2.19.jpeg'],
          'I labeled every bearing cap by its exact original position, per the factory engine manual. The main and rod bearings were significantly worn — expected at 230k miles. The Mercedes dealership in Sacramento tracked down original bearings in Germany and had them shipped over.',
          ['2.20.jpeg'],
          'Old versus new bearings (old on the right):',
          ['2.21.jpeg', '2.22.jpeg'],
        ],
      },
      {
        title: 'Reassembly',
        blocks: [
          'With the crankshaft back from the machine shop, I reassembled the bottom end using a properly calibrated torque wrench and the factory torque specs from the Mercedes dealership service manual.',
          ['2.23.jpeg', '2.24.jpeg', '2.25.jpeg', '2.26.jpeg'],
          'I reinstalled the fuel-injection pump and set the timing approximately.',
          ['2.27.jpeg'],
          'Then every component I’d removed went back on, and I adjusted the valve clearance on each cylinder.',
          ['2.28.jpeg', '2.29.jpeg'],
          'Finally I replaced the clutch and pressure plate and bolted the transmission to the back of the engine, ready to go back in the car.',
          ['clutch.jpeg', '2.30.jpeg', '2.31.jpeg', '2.32.jpeg', '2.33.jpeg', '2.34.jpeg'],
        ],
      },
      {
        title: 'Back on the road',
        blocks: [
          'With the engine back in the car, I reconnected every electrical and mechanical connection, then fired it up to dial in the timing. After some adjusting, the engine ran beautifully.',
        ],
      },
      {
        title: 'Wedding car',
        blocks: [
          'A few years later, the 300D was used as our wedding car, adding another chapter to its story.',
          ['mercedes-wedding-couple.jpeg'],
          ['mercedes-wedding-getaway.jpeg', 'mercedes-wedding-just-married.jpeg', 'mercedes-wedding-arch.jpeg'],
        ],
      },
    ],
    beforeAfter: { before: '2.36.jpeg', after: '2.35.jpeg' },
    parts: [
      'Valve cover gasket', 'Oil cap gasket', 'Oil filter', 'Glow plugs', 'Vacuum pump gasket',
      'Oil filter housing gasket', 'Upper oil pan gasket', 'Lower oil pan gasket',
      'Oil cooler lines (rebuilt)', 'Timing chain tensioner', 'Main & rod bearings',
      'Crankshaft thrust washers', 'Front & rear crank seals', 'Water pump & gasket', 'Thermostat',
      'Crankshaft pulley', 'Engine mounts', 'Clutch disc & pressure plate', 'Clutch slave cylinder',
      'Power steering pump (rebuilt)', 'Power steering filter', 'Air filter',
    ],
    outcome:
      'Back together, the engine is now completely leak free and running like new. Throughout this project, I gained an even greater appreciation for the thoughtful German engineering behind it. The attention to detail is simply astounding.',
  },

  {
    slug: 'oldsmobile-1964',
    title: '1964 Oldsmobile V8',
    kicker: 'Engine rebuild',
    summary:
      'My late grandfather\'s 1964 Oldsmobile, passed down two generations. Its V8 engine was on the verge of catastrophic failure, so I gave it a much needed rebuild. While the engine was out, I also restored the engine bay, bringing it back to life alongside the engine.',
    cover: '3.22.jpeg',
    hero: '3.1.jpeg',
    meta: [],
    intro: [
      'This is the mechanical restoration of my late grandfather’s 1964 Oldsmobile, passed down to my father and then to me. The main focus was rebuilding the engine — it was knocking horribly and would barely run.',
    ],
    chapters: [
      {
        title: 'Removal',
        blocks: [
          'First, the hood came off to make room for the engine and transmission to come out as one unit.',
          ['3.2.jpeg', '3.3.jpeg'],
          'After disconnecting the driveshaft and every other mechanical and electrical connection, I pulled the engine and transmission.',
          ['3.4.jpeg', '3.5.jpeg'],
        ],
      },
      {
        title: 'Teardown',
        blocks: [
          'A first cleaning made it easier to work on.',
          ['3.6.jpeg'],
          'Then I began disassembling the engine for the rebuild.',
          ['3.9.jpeg', '3.7.jpeg', '3.10.jpeg', '3.11.jpeg'],
        ],
      },
      {
        title: 'Engine bay',
        blocks: [
          'Here’s the engine bay cleaned up. I wish I had a before photo — 50+ years of oil and grime were caked on everywhere. I started by scraping layers of debris off with a credit card, then finished with degreaser:',
          ['3.12.jpeg'],
          'I removed the fenders and wheel wells to repaint the frame and engine bay, and had the paint matched to refinish the white areas for continuity.',
          ['3.13.jpeg', '3.14.jpeg', '3.15.jpeg'],
        ],
      },
      {
        title: 'Machine work & rebuild',
        blocks: [
          'The machine work was done by a friend of a friend who specializes in Oldsmobile engines — I shadowed him through it. The reassembly and paint were mine.',
          ['1a.jpeg', '2a.jpeg', '3a.jpeg', '4a.jpeg', '5.jpeg', '6a.jpeg', '7.jpeg', '8.jpeg', '9.jpeg', '10.jpeg', '11.jpeg', '12.jpeg', '13.jpeg'],
        ],
      },
      {
        title: 'Reinstall',
        blocks: [
          'Back home, I installed the remaining components. With the whole front end still off, dropping the engine in was easy.',
          ['14.jpeg', '3.16.jpeg'],
          'Then the front-end parts went back on — every one repainted or restored in some way.',
          ['3.17.jpeg', '3.18.jpeg'],
          'The fenders went back on carefully:',
          ['3.19.jpeg', '3.20.jpeg'],
          'All that was left was the hood and front bumper.',
          ['3.21.jpeg', '3.23.jpeg'],
          'With the car together, I made many adjustments: lining up the hood and fender gaps as perfectly as I could, and tuning the carburetor so the engine ran neither rich nor lean.',
        ],
      },
    ],
    beforeAfter: { before: '3.2.jpeg', after: '3.22.jpeg' },
    parts: [
      'Spark plugs, wires & distributor cap', 'All rubber coolant hoses', 'Radiator',
      'Power steering pump (rebuilt)', 'Alternator brushes', 'Carburetor (rebuilt)', 'Water pump',
      'Oil & oil filter', 'Fuel filter', 'Freeze plugs', 'Camshaft', 'All engine bearings',
      'Heads rebuilt — new valves & seals', 'Timing chain & sprockets', 'Head gaskets',
      'Piston rings', 'Thermostat', 'Air filter', 'Oil pan, intake, water pump & valve cover gaskets',
    ],
    outcome:
      'Before the rebuild, this engine was about ready to lock up. When the oil pan came off I found metal fragments — the sign of a spun bearing. A little more driving and it would have seized, possibly ruining what could still be rebuilt. It was caught at the right time, and after some fine-tuning this 1964 Oldsmobile runs perfectly.',
  },

  {
    slug: 'rocket-stove',
    title: 'Rocket Stove',
    kicker: 'Thermal Mass heater',
    summary:
      'The adobe dome needed a heating system for the winter, so I studied rocket stove design and engineered and built one that follows the natural contours of the dome. Guests can now enjoy a cozy, wood heated space, warmed by the radiant bench on which they sit.',
    cover: '4.12.jpeg',
    coverPos: '15% 50%',
    hero: '4.12.jpeg',
    meta: [],
    intro: [
      'To be comfortable in the dome during winter, it needed a heater. After a lot of research I settled on a rocket stove — a highly efficient wood burner that uses far less wood than a traditional stove. I read a few books on the subject and set out to build one.',
    ],
    chapters: [
      {
        title: 'Planning',
        blocks: [
          'I drew a floor plan of the system, then made a mock-up of the core to see roughly where the chimney would need to exit.',
          ['4.1.jpeg', '4.2.jpeg'],
        ],
      },
      {
        title: 'Chimney',
        blocks: [
          'I carved a hole for the chimney with a hammer and chisel, then measured, cut and assembled the stovepipe.',
          ['4.3.jpeg', '4.4.jpeg'],
        ],
      },
      {
        title: 'The core',
        blocks: [
          'The concrete floor is essentially a massive heat sink, so I built an elevated buffer of aluminum and perlite between it and the stovepipe to keep heat from bleeding into the ground.',
          ['4.5.jpeg'],
          'I dry-fit the core without mortar first, to double-check every measurement before committing.',
          ['4.6.jpeg'],
          'With everything lined up, I mortared the bricks together and built an octagonal manifold beneath the barrel so the exhaust gases flow through and into the stovepipe.',
          ['4.7.jpeg'],
        ],
      },
      {
        title: 'Thermal-mass bench',
        blocks: [
          'Every empty space was filled with whatever thermal mass I could find — broken bricks, old concrete, rocks. That mass absorbs the heat moving through the stovepipe and holds onto it, making a warm bench to sit on. I rendered it with an earthen mix I made, and the rough bench took shape.',
          ['4.9.jpeg'],
        ],
      },
      {
        title: 'Finishing',
        blocks: [
          'I refined the bench with many layers of lime plaster, limewashed the bench and walls, and painstakingly cut and laid black tile for the floor.',
          ['4.11.jpeg', '4.10.jpeg'],
          ['4.13.jpeg', '4.14.jpeg'],
        ],
      },
      {
        title: 'How it works',
        blocks: [
          'The proportions of the system create a draft that pulls the flame sideways into the barrel. The smoke combusts in the barrel, then travels through the rest of the system, where most of its heat is extracted and stored in the bench. What leaves the chimney is a little water vapor, and it’s barely lukewarm.',
          ['t.jpeg'],
        ],
      },
    ],
    outcome:
      'The stove has been low-maintenance with great results — abundant warmth for guests and a cozy ambiance in the dome.',
  },

  // ---------------------------------------------------------------------------
  // IN-PROGRESS PAGES — status: 'in-progress' shows an "In progress" badge.
  // Replace each { todo: '...' } with paragraphs and photo groups as you go.
  // ---------------------------------------------------------------------------
  {
    slug: 'airstream-safari-1960',
    status: 'in-progress',
    title: '1960 Airstream Safari',
    kicker: 'Vintage trailer restoration',
    summary:
      'A 1960 Airstream Safari that my wife and I purchased from the original family who bought it new. We are currently restoring it from the ground up. It will serve as a tiny home while we build our forever home, then become a guest bedroom on our property.',
    cover: 'airstream-interior-white-oak-floor.jpeg',
    coverPos: '50% 55%',
    hero: 'airstream-as-found-exterior.jpeg',
    heroPos: '50% 58%',
    meta: [
      ['Trailer', '1960 Airstream Safari'],
      ['Scope', 'Full interior restoration'],
      ['Shelter', 'Custom timber pavilion'],
      ['Status', 'In progress'],
    ],
    intro: [
      'This 1960 Airstream Safari had spent years sitting. The shell was straight and the original layout was all still there — but the curtains had rotted to rags, the carpet was shot, and decades of grime covered everything inside.',
      { todo: 'Where the Airstream came from and what you want it to become.' },
    ],
    chapters: [
      {
        title: 'In CAD',
        blocks: [
          'I modeled the trailer in SolidWorks: the shell, roof, windows and running gear.',
          ['airstream-cad-model.png'],
          'The trailer model also went into the pavilion assembly, to check clearances under the roof.',
          ['pavilion-cad-with-airstream.jpeg'],
          { link: 'airstream-pavilion', text: 'See the pavilion build' },
        ],
      },
      {
        title: 'As found',
        blocks: [
          'The trailer as it arrived, parked on the pad that would later sit under the pavilion.',
          ['airstream-as-found-exterior.jpeg'],
          'Inside, the original 1960 layout was intact: a galley with a double sink and stove up front, a built-in dresser and wardrobe in the middle, and a bathroom across the rear.',
          ['airstream-as-found-interior-forward.jpeg', 'airstream-as-found-interior-rear.jpeg'],
          ['airstream-as-found-kitchen.jpeg', 'airstream-as-found-dresser.jpeg', 'airstream-as-found-rear-bench.jpeg'],
          'The bathroom still had its original pink tub and the foot-pedal toilet on a tiled platform.',
          ['airstream-as-found-tub.jpeg', 'airstream-as-found-toilet.jpeg'],
        ],
      },
      {
        title: 'Teardown',
        blocks: [
          'Everything came out — cabinets, cushions, fixtures and all — leaving an empty aluminum shell to work from.',
          ['airstream-teardown-yard.jpeg'],
          'Out goes the original foot-pedal toilet.',
          ['airstream-toilet-removal.mp4'],
          { todo: 'What you kept, what you scrapped, and anything you found once the interior was out.' },
        ],
      },
      {
        title: 'Frame & subfloor',
        blocks: [{ todo: 'Frame and subfloor condition, rot repair, axle — anything done underneath.' }],
      },
      {
        title: 'Interior skins',
        blocks: [
          'With the trailer emptied, I cleaned and painted the interior aluminum skins white, which makes the curved shell feel much bigger and brighter.',
          ['airstream-interior-painting.jpeg'],
          { todo: 'Prep steps — cleaning, primer, number of coats.' },
        ],
      },
      {
        title: 'Floor',
        blocks: [
          'Then a new hardwood floor went down. I painted the subfloor white, then laid the strips one row at a time down the length of the trailer with a pneumatic flooring nailer, working out from the center toward the curved walls.',
          ['airstream-floor-install-1.jpeg', 'airstream-floor-install-2.jpeg'],
          'Finished, the floor runs the full length of the trailer and is scribed to the curve at each end. The wheel-well covers were painted to match the walls.',
          ['airstream-interior-white-oak-floor.jpeg'],
          { todo: 'Flooring species, how it was fit to the curves, and the finish.' },
        ],
      },
      {
        title: 'Systems',
        blocks: [{ todo: 'Electrical, plumbing and gas — what you rewired, replaced or rebuilt.' }],
      },
      {
        title: 'Build-out',
        blocks: [{ todo: 'Cabinetry, kitchen, bed and finishes as they go in.' }],
      },
      {
        title: 'Then & now',
        blocks: [
          ['airstream-as-found-interior-rear.jpeg', 'airstream-interior-white-oak-floor.jpeg'],
          { link: 'airstream-pavilion', text: 'See the pavilion I built to shelter it' },
        ],
      },
    ],
    outcome: '',
  },

  {
    slug: 'airstream-pavilion',
    title: 'Airstream Pavilion',
    kicker: 'Timber structure',
    summary:
      'A heavy-timber pavilion designed in my favorite CAD program, SolidWorks, and built to permanently shelter the Airstream. The structure is made entirely from locally grown and milled Douglas fir harvested from Banner Mountain in Nevada City, CA.',
    cover: 'pavilion-angle.jpeg',
    coverPos: '50% 62%',
    hero: 'pavilion-front.jpeg',
    heroPos: '50% 60%',
    meta: [
      ['Built for', '1960 Airstream Safari'],
      ['Slab', '26 × 20 ft concrete'],
      ['Posts', 'Six 8×8s, 12 ft & 8½ ft'],
      ['Beams', 'Doubled 2×12'],
      ['Rafters', '2×12 at 24″ on center'],
      ['Drawings', '13-sheet set, SolidWorks'],
    ],
    intro: [
      'The Airstream needed a roof over it — something to keep the sun and rain off the aluminum while I restore it, and a permanent home once it’s done. I designed this pavilion in SolidWorks, produced a full set of shop drawings, and built it from heavy lumber on the concrete pad beside a big cedar.',
    ],
    chapters: [
      {
        title: 'Design',
        blocks: [
          'I modelled the whole structure before cutting anything — every post, beam, brace, rafter and bolt. The 26 × 20 ft slab and the Airstream itself are modelled in the assembly too, so I could check post locations and clearances around the trailer before committing to anything.',
          ['pavilion-dwg-overview.png'],
          'From the model I made a 13-sheet drawing set: an overview, layouts for the post anchors, rafters and roof sheathing, and a dimensioned drawing for every component.',
          'The roof is a single slope — tall posts on one side and short posts on the other — laid out to carry a full array of solar panels.',
          ['pavilion-cad-with-airstream.jpeg'],
        ],
      },
      {
        title: 'Post layout & anchors',
        blocks: [
          'Six posts sit on a 144″ × 180″ grid (12 × 15 ft on center). Each one stands on a steel knife-plate anchor: a 3⁄16″ slot is kerfed 4¾″ up into the base of the post, the plate slides in, and three ½″ bolts pass through. Twelve ⅝″ holes, 5″ deep, were drilled into the slab for the anchors.',
          ['pavilion-dwg-post-anchor-layout.png'],
          { todo: 'Photos of drilling the slab, setting the anchors and standing the posts.' },
        ],
      },
      {
        title: 'Posts',
        blocks: [
          'The posts are 8×8s — 144″ tall on the high side and 102″ on the low side, which sets the roof slope. Each is notched 4″ × 12″ at the top to seat the beam, which is through-bolted with four ½″ bolts.',
          'One post is built in two parts — a 115¼″ leg and a 40″ head joined with an 11¼″ half-lap and eight ½″ bolts — so it can be taken apart.',
          ['pavilion-dwg-tall-post.png', 'pavilion-dwg-breakaway-post-head.png'],
          { todo: 'Why the breakaway post — e.g. to get the Airstream in and out — and a photo of the splice.' },
        ],
      },
      {
        title: 'Beams & bracing',
        blocks: [
          'Each beam line is two 2×12s, 13 feet long, screwed together with fifteen GRK ½″ structural screws staggered every 12″. Two beam sections run end to end to span the full 26 feet. 4×6 knee braces, cut at 45°, tie the posts to the beams and stiffen the frame against racking; black steel brackets fasten each end.',
          ['pavilion-dwg-double-beam.png'],
          { todo: 'Photos of the beams going up.' },
        ],
      },
      {
        title: 'Rafters & sheathing',
        blocks: [
          'Fourteen 2×12 rafters, each 235½″ long, sit on the beams with birdsmouth notches cut to the roof pitch. They’re spaced 24″ on center, with 2×12 fascia boards along the ends.',
          'Raising them was a team job: one person up the ladder guiding each rafter onto the beams while two more pushed it up from below, with a ratchet strap to help hold it in place.',
          ['pavilion-raising-rafter-1.jpeg', 'pavilion-raising-rafter-2.jpeg'],
          ['pavilion-dwg-rafter-layout.png', 'pavilion-dwg-rafter.png'],
          'The roof deck is ½″ sheathing laid in staggered rows and fastened with 8d ring-shank nails — 6″ apart along every panel edge and 12″ in the field. The underside is left exposed.',
          ['pavilion-dwg-sheathing-layout.png'],
          { todo: 'Roofing material on top, and photos of the deck going on.' },
        ],
      },
      {
        title: 'Finished',
        blocks: [
          'The finished pavilion, with the Airstream backed in underneath.',
          ['pavilion-front.jpeg', 'pavilion-angle.jpeg'],
          { link: 'airstream-safari-1960', text: 'See the Airstream restoration' },
        ],
      },
    ],
    outcome: '',
  },

  // ---------------------------------------------------------------------------
  // SKELETON PAGES — text and photos still to come.
  // ---------------------------------------------------------------------------
  {
    slug: 'cottage-restoration',
    title: 'Cottage Restoration',
    kicker: 'Rental property restoration',
    cover: 'cottage-exterior-hero.jpeg',
    hero: 'cottage-exterior-hero.jpeg',
    summary:
      'A uniquely shaped 1940s cottage that my business partner and I restored on our rental property. We completely remodeled the interior and exterior, bringing the structure back to life while upgrading all of its mechanical systems. It is now fully restored and serving as a rental home in Grass Valley, CA.',
    meta: [
      ['Type', 'Rental property'],
      ['Design', 'SolidWorks'],
    ],
    intro: [
      'A cottage restoration for a rental property. I modeled the work in SolidWorks before starting.',
      { todo: 'Where the cottage is, what shape it was in, and what the restoration covered.' },
    ],
    chapters: [
      {
        title: 'In CAD',
        blocks: [
          'Before building the new covered entry, I modeled the cottage in SolidWorks to size the awning and check how it would look on the front of the house.',
          ['cottage-solidworks-model.jpeg', 'cottage-solidworks-model-laundry.jpeg'],
          'I then rendered the model with siding, trim and roofing to see the finished look before we built it.',
          ['cottage-render-front34.jpeg'],
          ['cottage-render-awning.jpeg', 'cottage-render-lower34.jpeg'],
        ],
      },
      {
        title: 'As found',
        blocks: [
          'These are the listing photos from when we bought the property. The cottage was in rough shape: the red siding was faded and peeling, and the grass had grown up to the windows.',
          ['cottage-before-1.jpeg'],
          ['cottage-before-2.jpeg', 'cottage-before-3.jpeg'],
          'Inside, the main room had a makeshift kitchen built from open shelving and a plywood counter, with bare subfloor showing underneath.',
          ['cottage-before-4.jpeg', 'cottage-before-6.jpeg'],
          'The bathroom had holes cut in the drywall, and the lower level (now the laundry room) was unfinished concrete with exposed wiring and plumbing.',
          ['cottage-before-5.jpeg', 'cottage-before-7.jpeg'],
        ],
      },
      {
        title: 'Siding & paint',
        blocks: [
          'The exterior came first. We sanded the old red paint off the siding, down to bare wood in most places.',
          ['cottage-siding-stripped.jpeg', 'cottage-siding-sanded.jpeg'],
          'Then the whole cottage got a coat of white primer. This time-lapse covers a day of priming:',
          ['cottage-priming-timelapse.mp4'],
          'The two-story section of the cottage, set into the hillside, got the same treatment: primer, a light blue finish coat, and white trim.',
          ['cottage-two-story-priming.jpeg', 'cottage-two-story-blue.jpeg'],
          ['cottage-two-story-priming-timelapse.mp4'],
          'Then the blue went on. This time-lapse shows the finish coat going over the primer:',
          ['cottage-blue-paint-timelapse.mp4'],
          ['cottage-two-story-trim.jpeg', 'cottage-two-story-front.jpeg', 'cottage-blue-from-drive.jpeg'],
        ],
      },
      {
        title: 'Floor framing',
        blocks: [
          'Part of the floor had sagged. I opened it up to get at the framing underneath.',
          ['cottage-floor-opened.jpeg', 'cottage-floor-level.jpeg'],
          'From the laundry room below, I jacked the floor back up to level, then added new framing alongside the old joists to hold it there.',
          ['cottage-floor-jack.jpeg', 'cottage-floor-jack-above.jpeg'],
          ['cottage-floor-sistered.jpeg'],
        ],
      },
      {
        title: 'Walls & flooring',
        blocks: [
          'Inside, the walls were patched and primed, and new plank flooring went down throughout.',
          ['cottage-interior-walls-primed.jpeg'],
          ['cottage-flooring-timelapse.mp4'],
          ['cottage-interior-floor.jpeg'],
        ],
      },
      {
        title: 'Bathroom',
        blocks: [
          'The shower was built from scratch: a drain cut into a new plywood subfloor, then cement board, then tile set with leveling clips to keep it flat.',
          ['cottage-shower-drain.jpeg', 'cottage-shower-tile-clips.jpeg'],
          ['cottage-shower-finished.jpeg'],
          'The finished bathroom: a glass shower enclosure, a vanity, and glass shelving under the window.',
          ['cottage-shower-door.jpeg', 'cottage-shower-tile.jpeg'],
          ['cottage-bathroom-vanity.jpeg', 'cottage-bathroom-shelves.jpeg'],
        ],
      },
      {
        title: 'Loft & ladder',
        blocks: [
          'A sleeping loft sits over the bathroom and closet, with a ladder and railing made from black iron pipe.',
          ['cottage-ladder.jpeg', 'cottage-loft-railing.jpeg'],
          ['cottage-loft-below.jpeg', 'cottage-loft-floor.jpeg'],
        ],
      },
      {
        title: 'Kitchen',
        blocks: [
          'The kitchen went from a temporary counter to a full run of cabinets, a new range, and a tile backsplash.',
          ['cottage-kitchen-cabinets-rough.jpeg', 'cottage-kitchen-cabinets.jpeg'],
          ['cottage-kitchen-backsplash.jpeg', 'cottage-kitchen-counter.jpeg'],
          ['cottage-kitchen-finished.jpeg', 'cottage-kitchen-range.jpeg'],
          ['cottage-kitchen-wide.jpeg'],
          ['cottage-kitchen-sink.jpeg', 'cottage-kitchen-appliances.jpeg', 'cottage-kitchen-drawer.jpeg'],
        ],
      },
      {
        title: 'Drainage',
        blocks: [
          'To keep water away from the foundation, we dug a trench around the cottage and laid drain pipe.',
          ['cottage-drainage-trench.jpeg', 'cottage-drainage-pipe.jpeg'],
        ],
      },
      {
        title: 'Finished',
        blocks: [
          'The finished cottage: a new covered entry over the front door, and the two-story section in its new blue paint.',
          ['cottage-exterior-hillside.jpeg', 'cottage-exterior-laundry-path.jpeg'],
          ['cottage-exterior-awning.jpeg'],
          ['cottage-exterior-porch.jpeg', 'cottage-exterior-finished.jpeg'],
          ['cottage-interior-finished.jpeg'],
          ['cottage-two-story-finished.jpeg'],
          'Inside, the main room has the kitchen along one wall, a closet and the loft at the back, and exposed beams overhead with a ductless mini-split for heating and cooling.',
          ['cottage-main-room.jpeg', 'cottage-loft-closet.jpeg'],
          ['cottage-beams-minisplit.jpeg', 'cottage-beam-lights.jpeg', 'cottage-closet-shelf.jpeg'],
          'Downstairs, the laundry room in the lower level.',
          ['cottage-laundry.jpeg', 'cottage-laundry-workshop.jpeg'],
        ],
      },
    ],
    outcome: '',
  },

  {
    slug: 'gridfinity-tool-drawer',
    title: 'Gridfinity Tool Drawer',
    kicker: 'tool organization',
    summary:
      'Having to move between my various projects inspired me to design and build a mobile tool organization system housed in a five-foot-long drawer in my 1988 Toyota pickup. I modeled every tool holder in SolidWorks, refining each design down to the smallest detail. Rather than settling for holders that simply worked, I focused on getting every fit, dimension, and detail just right. Each holder was then 3D printed on a Bambu Lab P1S.',
    meta: [
      ['System', 'Gridfinity'],
      ['Design', 'SolidWorks'],
    ],
    intro: [
      'A Gridfinity drawer system that holds all of my tools, with every bin modeled in SolidWorks.',
      { todo: 'Why you built it, and how many drawers and bins it has.' },
    ],
    chapters: [
      { title: 'In CAD', blocks: [{ todo: 'SolidWorks screenshots of the bins and the drawer layout.' }] },
      { title: 'Printing & fitting', blocks: [{ todo: 'How the bins were made (printer, material) and fitted to each tool.' }] },
      { title: 'Finished', blocks: [{ todo: 'Photos of the filled drawers.' }] },
    ],
    outcome: '',
  },

  {
    slug: 'toyota-pickup-camper-1988',
    title: '1988 Toyota Pickup Camper',
    kicker: 'Truck camper build',
    cover: 'camper-truck-exterior.jpeg',
    summary:
      'A custom built camper and mobile workshop based on my 1988 Toyota Pickup. I lined the camper shell with cedar and designed a complete off-grid electrical system featuring a 200Ah battery bank, 400W of solar panels, and a 1,200W inverter. The setup also includes a diesel powered heater and 12V refrigerator, creating a comfortable space for extended trips while providing power for tools, equipment, and everyday needs.',
    meta: [
      ['Truck', '1988 Toyota pickup'],
      ['Shell', 'Custom fit'],
      ['Interior', 'Cedar lined'],
      ['Heat', 'Diesel heater'],
      ['Power', 'Solar, my own design'],
      ['Fridge', 'Runs on solar'],
    ],
    intro: [
      'I custom fit a camper shell to a 1988 Toyota pickup and made the inside livable: cedar lining, a diesel heater, and a solar system I designed to run a refrigerator.',
      { todo: 'Where the truck came from and how you use it.' },
    ],
    chapters: [
      { title: 'Fitting the shell', blocks: [{ todo: 'How the camper shell was custom fit to the truck, with photos.' }] },
      {
        title: 'Cedar interior',
        blocks: [
          'I lined the walls, doors and ceiling of the shell with cedar boards, working around the screened side windows.',
          ['camper-cedar-install.jpeg', 'camper-cedar-walls.jpeg'],
          ['camper-cedar-ceiling.jpeg'],
          { todo: 'The bed and storage layout.' },
        ],
      },
      { title: 'Diesel heater', blocks: [{ todo: 'The heater, where it is mounted, fuel and exhaust routing.' }] },
      {
        title: 'Solar & refrigerator',
        blocks: [
          'Before buying any parts, I worked out how much power the camper would actually use in a day. I listed every load (the MaxxAir 7500K roof fan, an ICECO VL35 ProS refrigerator, my phone and laptop, a small rice cooker and six puck lights) and estimated each one from manufacturer data and real-world tests. That came to about 1,100 Wh a day, or roughly 92 Ah at 12 V.',
          ['camper-power-budget.png'],
          'Doubling that for a day of backup pointed to a 200 Ah lithium battery bank. Recharging it in about six hours of sun takes roughly 370 W of panel, and the charge-controller sizing landed on a 30 A Victron MPPT 100/30, which leaves room to add panels later.',
          ['camper-battery-solar-sizing.png'],
          'Then I drew up the full wiring diagram: solar panels to the charge controller, the battery bank feeding a fuse block and a Victron 12/1200 pure sine wave inverter, and separate circuits for the fan, the refrigerator and three pairs of lights.',
          ['camper-wiring-diagram.png'],
        ],
      },
      {
        title: 'Finished',
        blocks: [
          'The finished camper on the truck.',
          ['camper-truck-exterior.jpeg'],
        ],
      },
    ],
    outcome: '',
  },

  {
    slug: 'shigley-hauler',
    section: 'professional',
    title: 'Shigley Hauler 2.0',
    kicker: 'Engineering competition · 1st place',
    summary:
      'A motor-driven gear transmission my team and I designed and built for EME 150B, the mechanical design course at UC Davis. In the class\'s Shigley Hauler competition, it pulled a weighted load up a ramp at steeper and steeper angles, and our team took first place.',
    cover: 'shigley-hauler-finished.jpeg',
    hero: 'shigley-hauler-finished.jpeg',
    meta: [
      ['Course', 'EME 150B, UC Davis'],
      ['Team', 'SH✱GLEY'],
      ['Result', '1st place'],
      ['Build', '3D printed frame & gears'],
    ],
    intro: [
      'For the final project in EME 150B, each team designed and built a transmission to haul a load up an inclined ramp. Runs were timed at increasing angles and loads, measured in "Shigleys".',
      { todo: 'Your role on the team, and the design goals: motor, gear ratio, and why you chose them.' },
    ],
    chapters: [
      {
        title: 'Design & parts',
        blocks: [
          'The frame, gears and shaft supports were 3D printed, then fitted with steel shafts, bearings and the drive motor.',
          ['shigley-hauler-shafts.jpeg', 'shigley-hauler-frame.jpeg'],
          ['shigley-hauler-parts.jpeg', 'shigley-hauler-parts-layout.jpeg'],
          'The full assembly in SolidWorks: the motor and battery pack at one end, driving the gear train across the shafts to the spools.',
          ['shigley-hauler-cad.jpeg', 'shigley-hauler-cad-front.jpeg'],
        ],
      },
      {
        title: 'Assembly',
        blocks: [
          'Fully assembled, with the gear train stacked across five shafts between the side plates.',
          ['shigley-hauler-assembled.jpeg', 'shigley-hauler-in-hand.jpeg'],
        ],
      },
      {
        title: 'Competition day',
        blocks: [
          'Every team brought their hauler to the engineering shop for the final runs.',
          ['shigley-hauler-competition-floor.jpeg'],
          'Each hauler was clamped to the top of the ramp, and its line was hooked to the loaded sled at the bottom.',
          ['shigley-hauler-team.jpeg', 'shigley-hauler-on-ramp.jpeg', 'shigley-hauler-mounting.mp4'],
          'Our times: 5.5 s at 20° with one Shigley, 12 s at 30° with two, and 30.69 s at 40° with four. That was enough for first place.',
          ['shigley-hauler-results.jpeg'],
        ],
      },
    ],
    outcome: 'First place in the EME 150B Shigley Hauler competition.',
  },
];
