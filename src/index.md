---
title: home
layout: home
---

<!-- {% img 'yaltinapangati' %}  
Antikythera  
What Is Life?  
By Blaise Agüera y Arcas  
With Practise  
wil.antikythera.org  
{% endimg %} -->

<!-- # Back cover

Excerpted from *What Is Intelligence?* by Blaise Agüera y Arcas, serialized on the web from fall 2024 and available in print fall 2025

Compliments of Antikythera and MIT Press  
antikythera.org  
mitpress.mit.edu

Printed and bound in Belgium

ISBN 979-8-895-90084-0 -->

<!-- # Contents

Series preface  
Foreword

**Abiogenesis**  
**Symbiogenesis**  
**Reproductive functions**  
**Life as computation**  
**Artificial life**  
**Thermodynamics**  
**Dynamic stability**  
**Complexification**  
**Virality**  
**Compression**  
**Embodiment**  
**Élan vital**

Acknowledgments  
About the author  
Bibliography  
Image credits  
Note on the artwork  
Note on the type -->

<!-- # Series preface

Antikythera is a philosophy of technology research program reorienting planetary computation as a philosophical, technological, and geopolitical force.

It takes its name from the first known computer, the Antikythera mechanism, an ancient tool for orientation, navigation, planning, and prediction across planets.

Antikythera understands the future of computation as more than calculation. It is a technology to think with. It is an instrument for epistemological discovery.

Arguably computation was discovered as much as it was invented. It is part of how the universe works, including, as Blaise Agüera y Arcas will show, how life works. 

That such a claim could be made is due in no small part to the creative and curious use of our computational tools—or what we might more precisely call *artificial* computation. With those tools we discover that some otherwise imperceivable building blocks of our reality and of our own flesh are themselves computational. Computation discovers itself through us.

The Antikythera book series, in collaboration with MIT Press, begins with this extraordinary little book that asks perhaps the most complex question of all: what is life?

The answers are surprising not only in themselves but also in how they reframe the question to include also *how* is life. As it turns out, *how* and *what* can be the same thing.

We are proud to launch this initiative by laying a cornerstone with the thoughts of my dear friend, Blaise.

**Benjamin Bratton**  
La Jolla, California  
September 2024 -->

{% chapter 'foreword'%}  

# Foreword

In late 2023, I set out to write *What Is Intelligence?*, a short volume on AI to help kick off the Antikythera book series in collaboration with MIT Press. The title was an homage to physicist Erwin Schrödinger’s slim but influential 1944 book, *What Is Life?*

{% img 'wil1944' %}In retrospect, it seems like no coincidence that my newly formed team at Google, Paradigms of Intelligence, was not only working to extend and improve on existing approaches to AI; we had also caught the Artificial Life bug, as many AI researchers have before. Hence life, artificial and otherwise, became the focus of Part I of the book. Life and intelligence turn out to be deeply intertwined. Both are products of the same fundamental evolutionary forces, and both are (I will argue) computational at heart. It may be misleading even to think about them as distinct phenomena.{% endimg %}

Our plan had always been to publish *What Is Intelligence?* both in print and freely online, in a serialized and media-rich form, beginning with a first installment for Antikythera’s launch event at MIT in October 2024\. It seemed natural to begin with Part I. Late that summer, we realized that since *What Is Intelligence?* had grown a good deal longer than I had originally imagined, Part I could stand alone as a little book in its own right. So we raced to get a few hundred in print. That is what you are now holding. It’s the right size, and covers the right material, to be called—with due deference to the 80-year-old original—*What Is Life?*

---

{% endchapter %}  
{% chapter_opener %}  
## Abiogenesis

**How did life <br> on Earth begin?** 



In the nineteenth century, this seemed like an unanswerable question. Researchers attempting to catch life in the act of “spontaneous generation” had come up empty-handed once they learned how to decontaminate their samples.

As William Thomson (1824–1907), the future Lord Kelvin, put it in an 1871 address before the British Association for the Advancement of Science, “Dead matter cannot become living without coming under the influence of matter previously alive. This seems to me as sure a teaching of science as the law of gravitation.”[^1]


Has life somehow *always* existed, then? Did it arrive on Earth from outer space, borne on an asteroid? Thomson thought so, and some still do. Not that this “panspermia” hypothesis really gets us anywhere. Where did the asteroid come from, and how did life arise *there*?{% endchapter_opener  %}  

{% img 'duret' %}
Despite his clear articulation of the principle of evolution, Charles Darwin (1809–1882) didn’t have a clue either. That’s why, in 1863, he wrote to his close friend Joseph Dalton Hooker that “it is mere rubbish, thinking, at present, of origin of life; one might as well think of origin of matter.”[^2]

Today, we have more of a clue, although the details may forever be lost to deep time.



Biologists and chemists working in the field of *abiogenesis*—the study of the moment when, billions of years ago, chemistry became life—have developed multiple plausible origin stories. In one, proto-organisms in an ancient “RNA world” were organized around RNA molecules, which could both replicate and fold into 3D structures that could act like primitive enzymes.[^3] In an alternative “metabolism first” account,[^4] life began without genes, likely in the rock chimneys of “black smokers” on the ocean floor; RNA and DNA came later. It may eventually be possible to rule one or the other theory out … or it may not.
{% endimg %}

{% media_f 'blacksmokervideo' %}
We’ll return to RNA and replication, but let’s begin by unpacking the “metabolism first” version in some detail, as it sheds light on the problem that confounded Darwin and his successors: how evolution can get off the ground without genetic heritability. As we’ll see, abiogenesis becomes less puzzling when we develop a more general understanding of evolution—one that can extend back to the time *before* life.{% endmedia_f %}

{% img 'volcanovideo' %}Let’s cast our minds back to our planet’s origins. The Hadean Eon began 4.6 billion years ago, when the Earth first condensed out of the accretion disc of rocky material orbiting our newborn star, the Sun. Our planet’s mantle, runnier than it is today and laden with hot, short-lived radioactive elements, roiled queasily, outgassing carbon dioxide and water vapor. The surface was a volcanic hellscape, glowing with lakes of superheated lava and pocked with sulfurous vents belching smoke.

It took hundreds of millions of years for surface conditions to settle down. According to the International Astronomical Union, an object orbiting a star can only be considered a planet if it has enough mass to either absorb or, in sweeping by, to eject other occupants from its orbit. But in the chaos of the early Solar system, this took a long time. While Earth was clearing its orbit of debris, it was continually bombarded by comets and asteroids, including giant impactors more than 60 miles across. A single such impact would have heated the already stifling atmosphere to a thousand degrees Fahrenheit.

One of those collisions appears to have been with another newly formed planet, an event that came close to destroying the Earth altogether. According to this theory, enough broken, liquefied, and vaporized rock splashed into orbit to coalesce into the Moon.{% endimg %}

{% img 'zircon' %}Unsurprisingly, very little geological material survives from the Hadean—mainly zircon crystals embedded within metamorphic sandstone in the Jack Hills of Western Australia.

It’s difficult to imagine anything like life forming or surviving under such harsh conditions. Maybe, somehow, it did. We know for sure that by later in the Hadean or the early Archaean—3.6 billion years ago, at the latest—the surface had cooled enough for a liquid ocean to condense and for the chemistry of life to begin brewing.{% endimg %}

Today, those early conditions are most closely reproduced by black smokers. These form around hydrothermal vents on the mid-ocean ridges where tectonic plates are pulling apart and new crust is forming. In such places, seawater seeping down into the rock comes into contact with hot magma. Superheated water then boils back up, carrying hydrogen, carbon dioxide, and sulfur compounds, which precipitate out to build smoking undersea chimneys. Probes sent thousands of feet down to explore these otherworldly environments find them teeming with weird life forms of all kinds, attracted by warmth, nutrients, and each other. Some of the inhabitants may go a long, long way back.

Like lava rock, the chimneys are porous, and the pores are ideal little chambers for contained chemical reactions to take place—potentially powered by a handy energy source, since the hydrogen gas creates proton gradients across the thin walls between pores, making them act like batteries.[^5] Given energy, iron sulfide minerals in the rock to act as catalysts, and carbon dioxide bubbling through, self-perpetuating loops of chemical reactions can sputter to life, like a motor turning over.

{% img_x 'krebs-reversekrebs' %}Perhaps this was life’s original motor: a primitive but quasi-stable metabolism, as yet without genes, enzymes, or even a clearly defined boundary between inside and outside. Such upgrades might have followed before long, though, for that chemical synthesis motor closely resembles the “reverse Krebs cycle,” now widely believed to have powered the earliest cells.

The ordinary or “forward” Krebs cycle was discovered in 1937 by groundbreaking biochemist Hans Krebs (1900–1981). More like a gas-powered generator than a motor, the Krebs cycle is at the heart of how all aerobic organisms on Earth “burn” organic fuels to release energy, a process known as “respiration.”[^6] Inputs to this cycle of chemical reactions include complex organic molecules (which we eat) and oxygen (which we inhale); the “exhaust” contains carbon dioxide and water (which we exhale). The energy produced maintains proton gradients across folded-up membranes inside our mitochondria, and the flow of these protons goes on to power every other cellular function.

The idea of a “reverse Krebs cycle” was first proposed by a trio of researchers at UC Berkeley in 1966.[^7] It remained controversial for decades, but is now known to power carbon fixation in ancient anaerobic sulfur bacteria—some of which still make their homes in deep-sea hydrothermal vents.[^8] As its name implies, the reverse Krebs cycle consists of roughly the same chemical reactions as the forward cycle, but running in the opposite direction. Starting with water and carbon dioxide, proton gradients drive the synthesis of all of the basic building blocks needed for cellular structure and function, including sugars, amino acids for proteins, fatty acids and isoprenes for cell membranes, and nucleotides for building RNA and DNA.[^9]{% endimg_x %}

{% img 'matryoshka' %}All life came from the sea, and the interior of every cell in every living organism reproduces that salty, watery environment—a tiny “ocean inside.” This much is common knowledge. But our mitochondria, the “power plants” within our cells where respiration takes place, may in fact be recapitulating the much more specific deep-sea chemistry of a black smoker. In an almost literal sense, our bodies are like Russian matryoshka dolls, membranes within membranes, and each nested environment recreates an earlier stage in the evolution of life on Earth.

The deeper inside ourselves we look, the farther we can see into the past. A beautiful, shivery thought.{% endimg %}

{% chapter 'symbiogenesis' %}  

{% chapter_opener %}  
## Symbiogenesis

**Whether RNA or metabolism came first, even the simplest bacteria surviving today are a product of many subsequent evolutionary steps.** 

Yet unlike the everyday, incremental mutation and selection Darwin imagined, the most important of these steps may have been large and sudden. These “major evolutionary transitions” involve simpler, less complex replicating entities becoming interdependent to form a larger, more complex, more capable replicator.[^10]
{% endchapter_opener %}  

{% media 'mitochondriavideo' %}As maverick biologist Lynn Margulis (1938–2011\) discovered in the 1960s, eukaryotic cells, like those that make up our bodies, are the result of such an event. Roughly two billion years ago, the bacteria that became our mitochondria were engulfed by another single-celled life form[^11] much like today’s archaea—tiny, equally ancient microorganisms that continue to inhabit extreme environments, like hot springs and deep-sea vents. This is “symbiogenesis,” the creation or genesis of a new kind of entity out of a novel “symbiosis,” or mutually beneficial relationship, among pre-existing entities.

At moments like these, the tree of life doesn’t just branch; it also entangles with itself, its branches merging to produce radically new forms. Margulis was an early champion of the idea that these events drive evolution’s leaps forward.{% endmedia %}

It’s likely that bacteria are themselves the product of such symbiotic events—for instance, between RNA and metabolism.[^12] RNA *could* replicate without help from proteins, and the metabolic motor *could* proliferate without help from genes, but when these systems cooperate, they do better. The looping chemical reaction networks in those black smokers can be understood as such an alliance in their own right, a set of reactions which, by virtue of catalyzing each other, can form a more robust, self-sustaining whole.

So in a sense, Darwin may have been right to say that “it is mere rubbish” to think about the origin of life, for life may have *had* no single origin, but rather, have woven itself together from many separate strands, the oldest of which look like ordinary chemistry. Intelligent design is not required for that weaving to take place; only the incontrovertible logic that sometimes an alliance creates something enduring, and that whatever is enduring … endures.

Often, *enduring* means both creating and occupying entirely new niches. Hence eukaryotes did not replace bacteria; indeed, they ultimately created many new niches for them. Likewise, the symbiotic emergence of multicellular life—another major evolutionary transition—did not supplant single-celled life. Like an ancient parchment overwritten by generations of scribes, our planet is a palimpsest, its many-layered past still discernible in the present. Even the black smokers, throwbacks to a Hadean sea billions of years ago, are still bubbling away in the depths. The self-catalyzing chemistry of proto-life may still be brewing down there, slowly, on the ocean floor.

The idea that evolution is driven by symbiotic mergers, the earliest of which preceded biology as we know it, has far-reaching implications. One is that the boundary between life and non-life is not well defined; symbiogenesis can involve any process that, one way or another, is self-perpetuating. Evolutionary dynamics are thus more like a physical law than a biological principle. *Everything* can be subject to evolution, whether we consider it to be “alive” or not.

The symbiogenetic view also renders the idea of distinct species, classified according to a Linnaean taxonomy, somewhat ill-defined—or at best, of limited applicability. Such taxonomies assume that only branching takes place, not merging. Bacteria, which promiscuously transfer genes even between “species,” already challenge this idea.[^13] Taxonomies break down entirely when we try to apply them to even more fluid situations, like the possible proto-life in black smokers, or microbiomes, or the more complex symbioses we’ll explore later.

{% media 'finchesvideo' %}Perhaps most importantly, symbiogenesis explains evolution’s arrow of time, as classical Darwinian theory alone cannot. When life branches, specializing to adapt to a niche—like Darwin’s finches with their differently shaped beaks, each optimized for a specific food source—those branches are in general no more complex than their ancestral form. This has led some classical evolutionary theorists to argue that the increasing complexity of life on Earth is an anthropocentric illusion, nothing more than the result of a random meander through genetic possibilities.[^14] Relatedly, one sometimes hears the claim that since all extant species are of equal age—as it seems they must be, since all share a common single-celled ancestor some four billion years ago—no species is more “evolved” than any other.

On its face, that seems reasonable. But as we’ve seen, classical Darwinian theory struggles to explain why life seems to become increasingly complex, or indeed, how life could arise in the first place. In themselves, random changes or mutations can only fine-tune, diversify, and optimize, allowing the expression of one or another variation already latent in the genetic space. (The space of possible finch beaks, for instance.){% endmedia %}

When one prokaryote ends up living inside another, though, or multiple cells band together to make a multicellular life form, the resulting composite organism is clearly more complex than its parts. Something genuinely new has arisen. The branching and fine-tuning of classical evolution can now start to operate on a whole different level, over a new space of combinatorial possibilities.

Classical evolution isn’t *wrong*; it just misses half of the story—the more rapid, more creative half. One could say that evolution’s other half is *re*volution, and that revolutions occur through symbiosis.

{% img 'haftedspear' %}Suggestively, the same is true of technology. In Paleolithic times, a hafted spear was not just a specialized stone point, but something new that arose by combining at least three parts: a stone point, a shaft, and something like sinew to bind them. This, too, opened up a new combinatorial design space. Or, in more recent times, the silicon chip was not just an evolved transistor; it was something new that could be made by putting multiple transistors together on the same die. One doesn’t arrive at chip design merely by playing with the design parameters of an individual transistor.

That’s why evolution progresses from simpler to more complex forms. It’s also why the simpler forms often remain in play even after a successful symbiogenetic event. Standalone stone points, like knives and hand axes, were still being made after the invention of the hafted spear; and, of course, spearheads themselves still count as stone points.[^15] Moreover, no matter how recently any particular stone point was made, we can meaningfully talk about stone points being “older” as a category than spears. Spears *had* to arise later, because their existence depended on the pre-existence of stone points.{% endimg %}

It’s equally meaningful to talk about ancient life forms, like bacteria and archaea, co-existing alongside recent and far more complex ones, like humans—while recognizing that humans are, in a sense, nothing more than complex colonies of bacteria and archaea that have undergone a cascade of symbiotic mergers.

{% chapter_opener %}  
## Reproductive functions

**While most biochemists have focused on understanding the particular history and workings of life on Earth, a more general understanding of life has come from an unexpected quarter: computer science.** 

The theoretical foundations of this surprising connection date back to two of the field’s founding figures: Alan Turing (1912–1954\) and John von Neumann (1903–1957).



Interest in Turing’s life and work has surged in the past decade, in part because of an AI thought experiment he posed in a 1950 paper, “Computing Machinery and Intelligence.”[^16] In that paper, Turing proposed that the *appearance* of intelligence under human questioning and the *reality* of intelligence could not justifiably be separated; sustained and successful imitation *was* the real thing. Hence the “Imitation Game,” now called the “Turing Test” in his honor.

{% endchapter_opener %}  

{% img 'turing' %}Turing’s most important contribution to computer science came fifteen years earlier, though. After earning a degree in mathematics at Cambridge in 1935, he focused on one of the fundamental outstanding problems of the day: the *Entscheidungsproblem* (German for “decision problem”), which asked whether there exists an algorithm for determining the validity of an arbitrary mathematical statement. The answer turned out to be “no,” but the way Turing went about proving it ended up being far more important than the result itself.[^17]{% endimg %}

{% img 'tapehead' %}Turing’s proof required that he define a general procedure for computation. He did so by inventing an imaginary gadget we now call the “Turing Machine.” The Turing Machine consists of a read/write head, which can move left or right along an infinite tape, reading and writing symbols on the tape according to a set of rules specified by a built-in table.

First, Turing showed that such a machine could do any calculation or computation that can be done by hand, given an appropriate table of rules, enough time, and enough tape. He suggested a notation for writing down the table of rules, which he referred to as a machine’s “Standard Description” or “S.D.” Today, we’d call it a “program.”

Then, the really clever part: if the *program itself* is written on the tape, there exist particular tables of rules that will read the program and perform whatever computation it specifies. Today, these are called “Universal Turing Machines.” In Turing’s more precise language, “It is possible to invent a single machine which can be used to compute any computable sequence. If this machine U is supplied with a tape on the beginning of which is written the S.D. of some computing machine M, then U will compute the same sequence as M.”{% endimg %}

{% img 'vonneumann' %}In the early 1940s, John von Neumann, a Hungarian American polymath who had already made major contributions to physics and mathematics, turned his attention to computing. He became a key figure in the design of the ENIAC and EDVAC—among the world’s first real-life Universal Turing Machines, now known simply as “computers.”[^18]

Turning an imaginary mathematical machine into a working physical one required many further conceptual leaps, in addition to a lot of hard nuts-and-bolts engineering. For instance, over the years, much creativity has gone into figuring out how simple the “Standard Description” of a Universal Turing Machine can get. Only a few instructions are needed. Esoteric language nerds have even figured out how to compute with a *single* instruction (a so-called OISC or “one-instruction set computer”).{% endimg %}

{% media_f 'maniac' %}There are irreducible requirements, though: the instruction, or instructions, must change the environment in some way that subsequent instructions are able to “see,” and there must be “conditional branching,” meaning that depending on the state of the environment, either one thing *or* another will happen. In most programming languages, this is expressed using “if/then” statements. When there’s only a single instruction, it must serve both purposes, as with the SUBLEQ language, whose only instruction is “subtract and branch if the result is less than or equal to zero.”

Both Turing and von Neumann were keenly aware of the parallels between computers and brains. Von Neumann’s report on the EDVAC explicitly described the machine’s basic building blocks, its logic gates, as electronic neurons.[^19] Whether or not that analogy held (it did not; neurons are more complex than logic gates), his key insight was that both brains and computers are defined not by their mechanisms, but by what they *do*—their *function*, in both the colloquial and mathematical sense.{% endmedia_f %}

In real life, though, the brain is not an abstract machine, but part of the body, and the body is part of the physical world. How can one speak in purely computational terms about the *function* of a living organism, when it must physically grow and reproduce?

{% media 'reactiondiffusion' %}Although working independently, Turing and von Neumann both became captivated by the connection between biology and computation toward the end of their lives.[^20] Turing did pioneering work in “morphogenesis,” working out how cells could use chemical signals, which he dubbed “morphogens,” to form complex self-organizing patterns—the key to multicellularity.[^21] Although computers were still too primitive to carry out any detailed simulations of such systems, he showed mathematically how so-called “reaction–diffusion” equations could generate spots, like those on leopards and cows, or govern the growth of tentacles, like those of the freshwater polyp, *Hydra*.[^22]{% endmedia %}

{% img 'ashby' %}Around the same time, in a 1951 paper,[^23] von Neumann imagined a machine made of standardized parts, like Lego bricks, paddling around on a reservoir where those parts could be found bobbing on the water. The machine’s job was to gather all of the needed parts and construct another machine like itself. Of course, that’s exactly what a bacterium does to reproduce; in fact it’s what every cell must do to divide, and what every mother must do to give birth.{% endimg %}

It’s possible for a trivially simple structure, like a seed crystal, to “reproduce” merely by acting as a template for more of the same stuff to crystallize around it. But a complex machine—one with any internal parts, for example—can’t serve as its own template. And if you *are* a complex machine, then, on the face of it, manufacturing something just as complex as you yourself are has a whiff of paradox, like lifting yourself up by your own bootstraps. However, von Neumann showed that it is not only possible, but straightforward, using a generalization of the Universal Turing Machine.

He envisioned a “machine A” that would read a tape containing sequential assembly instructions based on a limited catalog of parts, and carry them out, step by step. Then, there would be a “machine B” whose function was to copy the tape—assuming the tape itself was also made of available parts. If instructions for building machines A and B are *themselves* encoded on the tape, then *voilà*—you would have a replicator.[^24]

Instructions for building any additional non-reproductive machinery could also be encoded on the tape, so it would even be possible for a replicator to build something *more* complex than itself.[^25] A seed, or a fertilized egg, illustrates the point. Even more fundamentally, encoding the instructions to build oneself in a form that is itself replicated (the tape) is the key to open-ended evolvability, meaning the ability for evolution to select for an arbitrary design change, and for that change to be inherited by the next generation.

Remarkably, von Neumann described these requirements for an evolvable, self-replicating machine before the discovery of DNA’s structure and function.[^26] Nonetheless, he got it exactly right. For life on Earth, DNA is the tape; DNA polymerase, which copies DNA, is “machine B”; and ribosomes, which build proteins by following the sequentially encoded instructions on DNA, are “machine A.” Ribosomes and DNA polymerase are made of proteins whose sequences are, in turn, encoded in our DNA and manufactured by ribosomes. That is how life lifts itself up by its own bootstraps.


{% endchapter %}  
{% chapter 'life-as-computation'%}  
{% chapter_opener %}  
## Life as computation

**Although this is seldom fully appreciated, von Neumann’s insight established a profound link between life and computation.** 

Remember, machines A and B are Turing Machines. They must execute instructions that affect their environment, and those instructions must run in a loop, starting at the beginning and finishing at the end. That requires branching, such as “*if* the next instruction is the codon CGA *then* add an arginine to the protein under construction,” and “*if* the next instruction is UAG *then* STOP.” It’s not a metaphor to call DNA a “program”—that is literally the case.{% endchapter_opener %}  

Of course, there are meaningful differences between biological computing and the kind of digital computing done by the ENIAC or your smartphone. DNA is subtle and multilayered, including phenomena like epigenetics and gene proximity effects. Cellular DNA is nowhere near the whole story, either. Our bodies contain (and continually swap) countless bacteria and viruses, each running their own code.

{% media 'ribosome3d' %}Biological computing is massively parallel, decentralized, and noisy. Your cells have somewhere in the neighborhood of 300 *quintillion* ribosomes, all working at the same time. Each of these exquisitely complex floating protein factories is, in effect, a tiny computer—albeit a stochastic one, meaning not entirely predictable. The movements of hinged components, the capture and release of smaller molecules, and the manipulation of chemical bonds are all individually random, reversible, and inexact, driven this way and that by constant thermal buffeting. Only a statistical asymmetry favors one direction over another, with clever origami moves tending to “lock in” certain steps such that a next step becomes likely to happen. This differs greatly from the operation of logic gates in a computer, which are irreversible,[^27] and designed to be ninety-nine point many-nines percent reliable and reproducible.{% endmedia %}

{% media_f 'ferranti' %}Biological computing is computing, nonetheless. And its use of randomness is a feature, not a bug. In fact, many classic algorithms in computer science also require randomness (albeit for different reasons), which may explain why Turing insisted that the Ferranti Mark I, an early computer he helped to design in 1951, include a random number instruction.[^28] Randomness is thus a small but important conceptual extension to the original Turing Machine, though any computer can simulate it by calculating deterministic but random-looking or “pseudorandom” numbers.{% endmedia_f %}

Parallelism, too, is increasingly fundamental to computing today. Modern AI, for instance, depends on both massive parallelism *and* randomness—as in the parallelized “stochastic gradient descent” (SGD) algorithm, used for training most of today’s neural nets, the “temperature” setting used in chatbots to introduce a degree of randomness into their output, and the parallelism of Graphics Processing Units (GPUs), which power most AI in data centers.

Traditional digital computing, which relies on the centralized, sequential execution of instructions, was a product of technological constraints. The first computers needed to carry out long calculations using as few parts as possible. Originally, those parts were flaky, expensive vacuum tubes, which had a tendency to burn out and needed frequent replacement by hand. The natural design, then, was a minimal “Central Processing Unit” (CPU) operating on sequences of bits ferried back and forth from an external memory. This has come to be known as the “von Neumann architecture.”

{% img 'unorganized' %}Turing and von Neumann were both aware that computing could be done by other means, though. Turing’s model of morphogenesis was a biologically inspired form of massively parallel, distributed computation. So was his earlier concept of an “unorganized machine,” a randomly connected neural net modeled after the brain of an infant.[^29] These were visions of what computing without a central processor could look like—and what it *does* look like, in living systems.{% endimg %}

{% img 'constructor' %}Von Neumann also began exploring massively parallel approaches to computation as far back as the 1940s. In discussions with Polish mathematician Stanisław Ulam at Los Alamos, he conceived the idea of “cellular automata,” pixel-like grids of simple computational units, all obeying the same rule, and all altering their states simultaneously by communicating only with their immediate neighbors. With characteristic bravura, von Neumann went so far as to design, on paper, the key components of a *self-reproducing* cellular automaton, including a horizontal line of cells comprising a “tape” and blocks of cellular “circuitry” implementing machines A and B.

Designing a cellular automaton is far harder than ordinary programming, because every cell or “pixel” is simultaneously altering its own state and its environment. When that kind of parallelism operates on many scales at once, and is combined with randomness and subtle feedback effects, as in biological computation, it becomes even harder to reason about, “program,” or “debug.”{% endimg %}

Nonetheless, we should keep in mind what these two pioneers understood so clearly: computing doesn’t have to be done with a central processor, logic gates, binary arithmetic, or sequential programs. One can compute in infinitely many ways. Turing and his successors have shown that they are all equivalent, one of the greatest accomplishments of theoretical computer science.

{% media 'pesavento' %}

This “platform independence” or “multiple realizability” means that any computer can emulate any other one. If the computers are of different designs, though, the emulation may run s … l … o … w … l … y. For instance, von Neumann’s self-reproducing cellular automaton has never been physically built—though that would be fun to see\! It was only emulated for the first time in 1994, nearly half a century after he designed it.[^30]

It couldn’t have happened much earlier. Serious processing power is required for a serial computer to loop through the automaton’s 6,329 cells over the 63 *billion* time steps required for the automaton to complete its reproductive cycle. Onscreen, it worked as advertised: a pixelated two-dimensional Rube Goldberg machine, squatting astride a 145,315 cell–long instruction tape trailing off to the right, pumping information out of the tape and reaching out with a “writing arm” to slowly print a working clone of itself just above and to the right of the original.{% endmedia %}

It’s just as possible, though similarly slow, for a serial computer to emulate a neural network, heir to Turing’s “unorganized machine.” That’s why it wasn’t practical to run really big neural nets like those in Transformer-based chatbots until recently, thanks to ongoing progress in the miniaturization, speed, and parallelism of digital computers.

{% img_x 'nca' %}

In 2020, my colleague Alex Mordvintsev devised a clever combination of modern neural nets, Turing’s morphogenesis, and von Neumann’s cellular automata. Alex’s creation, the “neural cellular automaton” (NCA), replaces the simple per-pixel rule of a classic cellular automaton with a neural net.[^31] This net, capable of sensing and affecting a few values representing local morphogen concentrations, can be trained to “grow” any desired pattern or image, not just zebra stripes or leopard spots.

Real cells don’t literally have neural nets inside them, but they do run highly evolved, nonlinear, and purposive “programs” to decide on the actions they will take in the world, given external stimulus and an internal state. NCAs offer a general way to model the range of possible behaviors of cells whose actions don’t involve movement, but only changes of state (here, represented as color) and the absorption or release of chemicals.

The first NCA Alex showed me was of a lizard emoji, which could regenerate not only its tail, but also its limbs and head\! It was a powerful demonstration of how complex multicellular life can “think locally” yet “act globally,” even when each cell (or pixel) is running the same program—just as each of your cells is running the same DNA.

This was our first foray into the field known today as “artificial life” or “ALife.”{% endimg_x %}

{% endchapter %}  
{% chapter 'artificial-life' %}  
{% chapter_opener %}  
## Artificial life

**Von Neumann’s work on self-reproducing automata shows us that, in a universe whose physical laws did not allow for computation, it would be impossible for life to evolve.** 

Luckily, the physics of our universe *do* allow for computation, as proven by the fact that we can build computers—and that we’re here at all.

Now we’re in a position to ask: in a universe capable of computation, *how often* will life arise? Clearly, it happened here. Was it a miracle, an inevitability, or somewhere in between?{% endchapter_opener %}  

A few collaborators and I set out to explore this question in late 2023.[^32] Our first experiments made use of an esoteric programming language invented thirty years earlier by a Swiss physics student and amateur juggler, Urban Müller. I’m afraid he called this language … Brainfuck. Please direct all naming feedback his way.

However, the shoe fits; it *is* a beast to program in. Here, for instance, is a Brainfuck program that prints “helloworld”—and good luck making any sense of it:

\++++++\[−\>+++++\<\]\>−\[\>\[++++\>\]++++\[\<\]\>−\]\>\>\>\>.\>+.\<\<..\<−.\<+++.\>.+++.\>.\>\>−.

The upside of Brainfuck is its utter minimalism. It’s not quite a single-instruction language, like SUBLEQ, but as you can see, it includes only a handful of operations. Like a Turing Machine, it specifies a read/write head that can step left (the “\<” instruction) or right (the “\>” instruction) along a tape. The “+” and “−” instructions increment and decrement the byte at the current position on the tape.[^33] The “,” and “.” instructions input a byte from the console, or output a byte to it (you can count ten “.” instructions in the code above, one to print each letter of “helloworld”). Finally, the “\[” and “\]” instructions implement looping: “\[” will skip forward to its matching “\]” if the byte at the current position is zero, and “\]” will jump back to its matching “\[” if the byte is *non*zero. That’s it\!

It’s hard to believe that Brainfuck could be used to fully implement, say, the Windows operating system, but—it *is* “Turing complete.” Here that means: given enough time and memory (that is, a long enough tape), it can emulate any other computer and compute anything that *can* be computed.

In our version, which we call bff, there’s a “soup” containing thousands of tapes, each of which includes both code *and* data. This is key: in “classic” Brainfuck, the code is separate from the tape, whereas in bff, we wanted the code to be able to modify itself. That can only happen if the code itself is on the tape, as Turing originally envisioned.

Bff tapes are of fixed length—64 bytes, just one byte longer than the cryptic “helloworld” program above. They start off filled with random bytes. Then, they interact at random, over and over. In an interaction, two randomly selected tapes are stuck end to end, and this combined 128 byte–long tape is run, potentially modifying itself. The 64 byte–long halves are then pulled back apart and dropped back into the soup. Once in a while, a byte value is randomized, as cosmic rays do to DNA.

Since bff has only 7 instructions (represented by the characters “\<\>+−,\[\]”) and there are 256 possible byte values, following random initialization only 7/256, or 2.7%, of the bytes in a given tape will contain valid instructions; any non-instructions are simply skipped over.[^34] Thus, at first, not much comes of interactions between tapes. Once in a while, a valid instruction will modify a byte, and this modification will persist in the soup. On average, though, only a couple of computational operations take place per interaction, and usually, they have no effect. In other words, while any kind of computation is theoretically *possible* in this toy universe, precious little of it actually takes place—at first. Random mutation may alter a byte here and there. Even when a valid instruction causes a byte to change, though, the alteration is arbitrary and purposeless.

{% media 'bffvideo' %}But after millions of interactions, something magical happens: the tapes begin to reproduce\! As they spawn copies of themselves and each other, randomness quickly gives way to complex order. The amount of computation taking place in each interaction skyrockets, since—remember—reproduction requires computation. Two of Brainfuck’s seven instructions (“\[” and “\]”) are dedicated to conditional branching, and define loops in the code; reproduction requires at least one such loop (“copy bytes until done”), causing the number of instructions executed in an interaction to climb into the thousands.{% endmedia %}

{% img_x 'phasetransition-continuedrise' %}The code is no longer random, but obviously *purposive*, in the sense that its function can be analyzed and reverse-engineered. An unlucky mutation can break it, rendering it unable to reproduce. Over time, the code evolves clever strategies to increase its robustness to such damage.

This emergence of function and purpose is just like what we see in organic life at every scale; it’s why we’re able to talk about the function of the circulatory system, a kidney, or a mitochondrion, and how they can “fail”—even though nobody designed these systems.{% endimg_x %}

{% img 'z80' %}We reproduced our basic result with a variety of other programming languages and environments. Alex (of neural cellular automata renown) created another beautiful mashup, this time between cellular automata and bff. Each of a 200×200 array of “pixels” contains a program tape, and interactions occur only between neighboring tapes on the grid. In a nod to our nerdy childhoods, the tapes are interpreted as instructions for the iconic Zilog Z80 microprocessor, launched in 1976 and used in many 8-bit computers over the years (including the Sinclair ZX Spectrum, Osborne 1, and TRS-80). Here, too, complex replicators soon emerge from random interactions, evolving and spreading across the grid in successive waves.

Our simulations suggest that, in general, life arises spontaneously whenever conditions permit. Those conditions seem minimal: little more than a physical environment capable of supporting computation, some randomness, and enough time.{% endimg %}

Let’s pause and take stock of why this is so remarkable.

On an intuitive level, one doesn’t expect function or purposiveness to emerge spontaneously. To be sure, we’ve known for a long time that a modest degree of *order* can emerge from initially random conditions; for instance, the lapping of waves can approximately sort the sand on a beach, creating a gradient from fine to coarse. But if we were to begin with sand on a beach subject to random wave action, and came back after a few hours to find a poem written there, or the sand grains fused into a complex electronic circuit, we would assume someone was messing with us.

The extreme improbability of complex order arising spontaneously is generally understood to follow from thermodynamics, the branch of physics concerned with the statistical behavior of matter subject to random thermal fluctuations—that is, of all matter, since above absolute zero, *everything* is subject to such randomness. Matter subject to random forces is supposed to become more random, not less. Yet by growing, reproducing, evolving, and indeed by existing at all, life seems to violate this principle.

The violation is only apparent, for life requires an input of free energy, allowing the forces of entropy to be kept at bay. Still, the seemingly spontaneous emergence and “complexification” of living systems has appeared to be, if not strictly disallowed by physical laws, at least unexplained by them. That’s why the great physicist Erwin Schrödinger (1887–1961) wrote, in an influential little book he published in 1944 entitled *What Is Life?*,[^35]

“\[L\]iving matter, while not eluding the ‘laws of physics’ as established up to date, is likely to involve ‘other laws of physics’ hitherto unknown, which, however, once they have been revealed, will form just as integral a part of this science as the former.”

{% endchapter %}  
{% chapter 'thermodynamics'%}  
{% chapter_opener %}  
## Thermodynamics

**Before turning to those “other laws of physics,” it’s helpful to take a closer look at the original ones, and especially the Second Law of thermodynamics.**

These are deep waters. While the fundamental ideas date back to the groundbreaking work of nineteenth-century mathematical physicist Ludwig Boltzmann (1844–1906), we can understand their essence without math. Nonetheless, Boltzmann’s conceptually challenging ideas flummoxed many of his fellow scientists, and their implications continue to stir controversy even today. Much has been made of Einstein turning our everyday notions of space and time inside-out with his theory of relativity, developed in its initial form in 1905—just a year before Boltzmann, struggling with bipolar disorder, ended his own life. Arguably, though, Boltzmann’s earlier ideas disrupt our intuitions about time, cause, and effect even more radically than Einstein’s theory of relativity.[^36] Let’s dive in.{% endchapter_opener %}  

The Second Law of thermodynamics holds that any closed system will rise in entropy over time, becoming increasingly disordered. A hand-powered lawn mower, for example, starts off as a beautifully polished machine with sharp helical blades, round wheels, and toothed gears, all coupled together on smoothly rotating bearings. If left out in the elements, the bearings will seize up, the blades will dull, and oxidation will set in. After enough time, only a heap of rust will remain.

Similarly, if you were to take a dead bacterium (which, though a lot smaller, is far more complicated than a push mower) and drop it into a beaker of water, its cell membrane would eventually degrade, its various parts would spill out, and after a while only simple molecules would remain, dispersed uniformly throughout the beaker.

The Second Law gives time its arrow, because the fundamental laws of physics in our universe are very nearly time-reversible.[^37] Strange, but true: Newton’s equations (classical dynamics), Maxwell’s equations (electromagnetism), Schrödinger’s equations (quantum physics), Einstein’s equations (special and general relativity)—all of these physical laws would work the same way if time ran in reverse. The difference between the past and the future is *statistical*.

{% media 'billiardsvideo' %}Here’s a common undergraduate thought experiment to illustrate this point in the case of Newtonian dynamics. Imagine video footage of balls on a billiard table, all in random positions and moving in random directions. They will collide with one another and with the bumpers at the edge of the table, bouncing off at new angles. If we (unrealistically) assume frictionless motion and fully elastic collisions (i.e., balls don’t slow down as they roll, and none of the collision energy is dissipated as heat), this would go on forever. The summed momenta and summed energies of the balls will remain constant—and it will be impossible to tell whether you’re watching the video forward or in reverse. In such a universe, causality has no meaning, because nothing distinguishes causes from effects.

If the initial conditions were random, then the positions of the balls will continue to be randomly distributed over the table’s surface as they all bounce around, transferring some of their energy to each other with every collision. It would be astronomically unlikely for the balls to all bunch up in one spot. Their velocities, too, will be randomly distributed, both in direction and magnitude, so it would also be astronomically unlikely for them to, for instance, suddenly all be moving precisely parallel to the table’s edges. Complete disorder, in other words, is a stable equilibrium.[^38] In the presence of any thermal noise (that is, random perturbation), it is the *only* stable equilibrium.

Suppose, though, that the near-impossible happens. You see fifteen of the balls converge into a perfect, stock-still triangular grid, each ball just touching its neighbors, while the cue ball, having absorbed all of the combined kinetic energy of the other fifteen, whizzes away from the triangle. Aha\! Now, we know that we’re watching a pool break—and we know that we’re watching it *in reverse*. The arrow of time has been established. Along with it, we have causation: the triangle broke *because* it was hit by the cue ball.{% endmedia %}

Theoretically, nothing prevents the exact series of collisions from happening that would result in all of the energy being transferred to a single ball while leaving the others arrayed in a perfect triangle; but statistically, it’s vanishingly unlikely for such an ordered state to arise out of disorder—unless, perhaps, some mastermind set the balls in motion just *so*.

Although key thermodynamic concepts weren’t developed until the nineteenth century, an Enlightenment-era belief in a God who set the universe in motion just so arises intuitively from the apparent impossibility of order arising spontaneously out of disorder.[^39] In a mechanical, billiard-table universe where the laws of physics are inviolable and the laws of statistics seem to inexorably degrade any pre-existing order over time, it seems absurd that anything as complicated as life *could* arise spontaneously without some supernatural agent acting as “prime mover.” Only a God with exquisite foresight could have “initialized” the Big Bang such that, in the Earth’s oceans billions of years ago, simple organic molecules floating around apparently at random could coalesce into a working bacterium—an improbability many, many orders of magnitude less likely than fifteen out of sixteen whizzing billiard balls spontaneously coalescing into an unmoving triangle.

The billiard ball universe I’ve just described may seem abstract or arbitrary, but nineteenth-century theorists like Boltzmann had become interested in this problem for the most practical of reasons: it was the physics behind steam power, hence the entire Industrial Revolution. Engineering had preceded theory, as it often does.

{% img_x 'newcomen-watt' %}Thomas Newcomen (1664–1729), an English inventor and Baptist lay preacher, devised the first practical fuel-burning engine in 1712\. It was based on a heating-and-cooling cycle. First, steam from a boiler was allowed to flow into a cylindrical chamber, raising a piston; then, the steam valve closed, and a second valve opened, injecting a jet of cold water, causing the steam to condense and pull the piston back down. As the piston rose and fell, it rocked a giant beam back and forth, which, in Newcomen’s original design, was used to pump water out of flooded mines (which, in turn, supplied the coal these engines would soon be consuming so voraciously).

Scottish inventor and entrepreneur James Watt (1736–1819) greatly improved the steam engine design in 1776, making it a practical replacement for human and animal power across a wide range of applications. This was when the Industrial Revolution really got underway; for the first time, human-made machines began to *metabolize* on a large scale, “eating” complex organic molecules to perform mechanical work. 

Soon, far more energy would be flowing through this artificial metabolism than through the Krebs cycle in our own bodies.[^40] It was, in the broad sense I’ve been using in this book, a major evolutionary transition: a symbiogenetic event between humans and machines, like earlier symbioses between humans and draft animals. Machine metabolism allowed human society to explode from its pre-industrial scale (about one billion people in 1800, most of whom lived in extreme poverty) to its scale today (eight billion, most of whom no longer live in poverty).[^41] In the process, we’ve become nearly as dependent on machines for our continued existence as they are on us.{% endimg_x %}

However, even as coal-powered engines transformed the Victorian landscape—both figuratively and literally, for the pollution was dire—nobody understood them at a deep level. What *was* heat, and how could it be converted into physical work? For a time, the leading theory held that heat was a kind of invisible, weightless fluid, “caloric,” that could flow spookily into and through other matter.

{% img 'piston' %}By combining Newtonian physics, statistical calculations, and experimental tests, Boltzmann and his colleagues figured out what was really going on. Their conceptual setup was a three-dimensional version of the billiard table, in which the balls were gas molecules whizzing around in a pressurized chamber, bouncing off its walls. Calculating the average effect of all the bouncing led to the Ideal Gas Law, which established theoretical relationships between the pressure, volume, and temperature of a gas. The theory closely matched observations by experimentalists and engineers.[^42]

Volume is straightforward (that’s just the size of the chamber), but the idea that pressure is the aggregate force on the chamber’s walls as molecules bounce off them, and that temperature is the average kinetic energy[^43] of those whizzing molecules, was a profound insight. There was no need for any mysterious “caloric” fluid; heat was just motion on a microscopic scale. And the tendency toward a random distribution of molecular positions and momenta explains why, if you open a valve between two chambers containing gas at different pressures and/or temperatures, those pressures and temperatures will quickly equalize.{% endimg %}

Before moving beyond classical thermodynamics, let’s add a bit more realism to our billiard-ball universe. We know that balls bouncing around a billiard table don’t *actually* go on bouncing forever. They encounter friction, slowing down as they roll. And when they bounce off each other, the collisions are slightly “inelastic,” meaning that after the collision, they’re moving a bit slower than before. After a little while, they stop rolling.

How can that be? At a microscopic level, the laws of physics are reversible. Momentum is supposed to be conserved. And the amount of matter and energy also remains constant, whether we run time forward or in reverse. That’s the *First* Law of thermodynamics\!

Zooming in will reveal that, on a real billiard table, balls aren’t the smallest elements that bump against one other. Each billiard ball consists of lots of vibrating molecules bound together, and collisions between these individual molecules are what really cause the balls to bounce off each other—or, for that matter, cause a ball to roll across the felt rather than falling right through it.[^44] In each case, momentum is transferred between molecules. Every time this happens, the distribution of molecular momenta becomes a bit more random, that is, a bit less correlated with which ball the molecule happens to be in, or indeed whether it is in a ball at all, or in the felt underneath.

In the most random distribution of molecular velocities, there would be no more correlation between the velocities of two molecules in one ball than in the velocities of molecules in different balls. Every ball would be imperceptibly jiggling in place, with each of its constituent molecules contributing minutely to the dance. We call that random jiggling “heat.” When all correlated motion has been converted into uniformly distributed heat, we’ve reached a stable equilibrium.

While the balls are still rolling, the correlations between the velocities of their molecules are by no means all equal; the distribution is far from random. This is *not* a stable equilibrium. Hence, the inevitability of friction and the inelasticity of collisions are statistical phenomena—just more symptoms of the inexorable Second Law.

Going forward, then, we can zoom back out and imagine once more that the billiard balls are indivisible particles, not bound collections of molecules. In that case, all collisions would have to be elastic, all motion frictionless, and disordered, randomly colliding balls would be the equilibrium.

Once a system has reached equilibrium, it will stay that way forever—an end state Lord Kelvin called “heat death.”[^45] This seemingly trivial observation has some profound consequences. One is that the arrow of time will lose its meaning; any two consecutive moments *A*, *B* could just as likely have been ordered *B*, *A*. Nothing, therefore, can be said to be a cause, versus an effect.

Relatedly, no *work* can be done. If the system were out of equilibrium—for instance, if all of the whizzing balls were on one side of the billiard table—then we could put a movable barrier down between the empty and occupied sides, attached to a loaded crankshaft. As they bounce around, the balls would then nudge the barrier, doing work. What I’ve just described is, of course, a piston, like that of a steam engine.

But if the balls were equally likely to be anywhere, then no matter how fast they whizz and bounce, there’s nowhere to put the barrier that would result in any net force. The piston wouldn’t move because it would be buffeted equally from all sides. This idea can be generalized: work can only be done by a system in disequilibrium, for instance, when the pressure or temperature is high in one place, and low in another. That’s why Newcomen’s engine needed both hot steam *and* cold water.

I’ve already used the term *free energy*, but now we can define it. The free energy of a system is the amount of work it can be made to do. Far from equilibrium, when the entropy is low, much of the kinetic energy in the billiard balls is “free”; it can be used to move pistons, raise weights, produce electric currents, carry out computations, or drive metabolic processes. But at equilibrium, the entropy is maximized, and the free energy is zero. This insight into the relationship between energy, entropy, and work lies at the heart of thermodynamics—and life.

{% endchapter %}  
{% chapter 'dynamic-stability'%}  
{% chapter_opener %}  
## Dynamic stability

**Recall that life seemed deeply weird to Schrödinger because living things appear to violate the Second Law.** 

If the bacterium we drop into a beaker of water is alive rather than dead, and free energy is available in a form the bacterium can use, and the water contains simple molecules suitable for building more bacteria, then over time we will see the very opposite of an increase in disorder. After a while, the beaker will be *full* of bacteria, reproducing, cooperating, and competing with each other.
{% endchapter_opener %}  

They will even be evolving. If the beaker is sufficiently large—the size of a planet, for instance—and we wait a few billion years, then eventually beings as complicated as us may be in there, along with cities, advanced technologies, and perhaps plans to colonize the next beaker.

None of these processes can occur without free energy. For us, it comes, ultimately, from the sun. Thermodynamics tells us that even if the Second Law appears to be violated locally, it still holds when we zoom out. Order created in one place comes at the expense of increased disorder elsewhere. Hence, pollution, the finite lifetime of the sun, and the eventual heat death of the universe.

What concerns us here isn’t this big picture, but its apparent local violations, and the way they seem to become increasingly transgressive over time. The puzzle isn’t only that bacteria exist, but that the more time passes, the more complex life on Earth seems to become: from prokaryotes to eukaryotes; from eukaryotes to multicellular animals; from simple multicellular animals to ones with nervous systems; from brainy animals to complex societies; from horses and plows to space travel and AI.

Is there any general principle behind that complexification process, a kind of “however” or “yes, and” to the dismal Second Law? And could it account not only for evolution and complexification, but also for abiogenesis?

Yes, and yes. Bff can offer us a highly simplified model system for understanding that principle, just as an idealized billiard table gives us a model for understanding basic thermodynamics.

Replicators arise in bff because an entity that reproduces is more “dynamically stable” than one that doesn’t. In other words, if we start with one tape that *can* reproduce and one that *can’t*, then at some later time we’re likely to find many copies of the one that can reproduce, but we’re unlikely to find the other at all, because it will have been degraded by noise or overwritten.

Addy Pross, a professor emeritus of chemistry at Ben Gurion University of the Negev, describes the same phenomenon using the bulkier phrase “dynamic kinetic stability” (DKS).[^46] I’ll drop “kinetic,” since the idea also applies beyond Pross’s field of “chemical kinetics” (describing the rates at which chemical reactions take place). In bff, for example, dynamic stability can just as well apply to programs or program fragments.

As Pross points out, a population of molecules capable of replicating can be more stable than even the hardiest of passive materials. A passive object may be fragile, like a soap bubble, or robust, like a stone sculpture. The sculpture might endure for longer, but, in the end, it’s still ephemeral. Every encounter it has with anything else in the world will cause its composition or structure to degrade, its individual identity to blur. For a sculpture, it’s all downhill. That’s the Second Law at work, as usual.

A self-reproducing molecule—like the DNA inside a living bacterium—is another matter. It is thermodynamically fragile, especially if we consider its identity to consist not only of a general structure but of a long sequence of specific nucleotides. However, its *pattern* is not just robust, but “antifragile.”[^47] As long as DNA is able to reproduce—an inherently dynamic process—that pattern can last, essentially, forever. A bit of environmental stress or adversity can even help DNA maintain or improve its functionality. This is how order overcomes disorder.

In fact, Darwinian selection is *equivalent* to the Second Law, once we expand our notion of stability to include populations of replicators. Through a thermodynamic lens, Darwin’s central observation was that a more effective replicator is more stable than a less effective one. As Pross puts it,

“\[M\]atter \[...\] tends to become transformed \[...\] from less stable to more stable forms. \[...\] \[T\]hat is what chemical kinetics and thermodynamics is all about \[…\]. And what is the central law that governs such transformations? The Second Law. \[...\] In both \[the static and kinetic\] worlds chemical systems tend to become transformed into more stable ones \[...\]—thermodynamic stability in the ‘regular’ chemical world, dynamic kinetic stability in the replicator world.”[^48]

As a chemist, Pross is sensitive to the close relationships between energy, entropy, and stability, whether static or dynamic. However, he does not explicitly make a connection to the theory of computing.

It now seems clear that by unifying thermodynamics with the theory of computation, we should be able to understand life as the predictable outcome of a statistical process, rather than regarding it uneasily as technically permitted, yet mysterious. Our artificial life experiments demonstrate that, when computation is possible, it will be a “dynamical attractor,” since replicating entities are more dynamically stable than non-replicating ones; and, as von Neumann showed, replicators are inherently computational.

Bff has no concept of energy, but in our universe, replicators require an energy source. This is because, in general, computation involves irreversible steps—otherwise known as causes and effects—and thus, computing consumes free energy. That’s why the chips in our computers draw power and generate heat when they run. (And why my computer heats up when it runs bff.) Life must draw power and generate heat for the same reason: it is inherently computational.

{% endchapter %}  

{% chapter 'complexification'%}  
{% chapter_opener %}  
## Complexification

**When we pick a tape out of the bff soup after millions of interactions, once replicators have taken over, we often see a level of complexity in the program on that tape that seems unnecessarily—even implausibly—high.** 

A working replicator *could* consist of just a handful of instructions in a single loop, requiring a couple of hundred operations to run. Instead, we often see instructions filling up a majority of the 64 bytes, multiple and complex nested loops, and thousands of operations per interaction.{% endchapter_opener %}  

Where did all this complexity come from? It certainly doesn’t look like the result of simple Darwinian selection operating on the random text generated by a proverbial million monkeys typing on a million typewriters.[^49] In fact, such complexity emerges even with *zero* random mutation—that is, given only the initial randomness in the soup, which works out to fewer bytes than the text of this short book. Hardly a million monkeys—and far too few random bytes to contain more than a few consecutive instructions, let alone a whole working program.

The answer recalls Lynn Margulis’s great insight: the central role of symbiosis in evolution, rather than random mutation and selection. When we look carefully at the quiescent period before tapes begin replicating, we notice a steady rise in the amount of computation taking place. We are observing the rapid emergence of *imperfect* replicators—very short bits of code that, in one way or another, have some nonzero probability of generating more code. Even if the code produced is not like the original, it’s still code, and *only* code can produce more code; non-code can’t produce anything\!

Thus, a selection process is at work from the very beginning, wherein code begets code. This inherently creative, self-catalyzing process is far more important than random mutation in generating novelty. When bits of proliferating code combine to form a replicator, it’s a symbiotic event: by working together, these bits of code generate more code than they could separately, and the code *they* generate will in turn produce *more* code that does the same, eventually leading to whole-tape replication and an exponential takeoff.

{% media 'catscradlevideo' %}A closer look at the bff soup prior to the exponential takeoff reveals distinct phases of “pre-life,” which might have had close analogs during abiogenesis on Earth. In the first phase, individual instructions occasionally generate another individual instruction, but this is more akin to a simple chemical reaction than to any real computation; the instructions are not acting as part of any larger program.

In the second phase, we begin to see instructions in particular positions, or in particular combinations, that are likelier to lead to copies of themselves than one would expect by random chance, albeit often in indirect ways. “Autocatalytic sets” start to form: cycles of dynamical interactions that mutually reinforce each other. These, too, can arise spontaneously in the chemical world, and have long been theorized to have driven abiogenesis.[^50]

At this point, with autocatalytic fragments of code proliferating and colliding, a leap becomes possible that brings us beyond the world of digital chemistry and into the world of real computation: the emergence of the first true replicators. These are no longer mere autocatalytic sets, but short programs that copy themselves, or each other, using looped instructions.

With this leap to computation comes an enormous upgrade in evolvability, because now, any change made to a program that doesn’t break its copy loop will be heritable. Thus, classical Darwinian selection can kick in, allowing adaptation to a changing environment or speciation for occupying diverse niches. If we insist on making a distinction between non-life and life, this might be a reasonable place to draw that line.

However, these earliest replicating programs are unlikely to cleanly copy a whole tape. Often, they only copy short stretches of tape, which may get pasted into arbitrary locations, yielding unpredictable results. As these scrappy, fragmentary replicators proliferate, the bff soup enters a chaotic phase. Despite the churn, the tapes have not, at this point, resolved into any obvious structure. To the naked eye, they still *look* like random junk, although the rising amount of computation taking place (as measured both by the average number of operations per interaction and the density of instructions per tape) suggests that *something* is afoot.

Tracking the provenance of every byte in the soup, starting from random initialization, can make sense of the apparent chaos. At first, almost every byte of every tape remains whatever it was at initialization time; if we draw a line from each byte’s current position on a tape to its original source position, the lines will all extend back to time zero in parallel, like the warp threads of a loom. Once in a while, a byte will change, cutting a thread, or get copied, pulling it across the other threads diagonally.

With the rise of scrappy replicating programs, all remaining dependencies on the past are quickly cut as replicators copy over each other in a frenzy of creative destruction. Any given byte might get copied hundreds of times to a series of different tape locations, in the process wiping out whatever had been there before. Shortly afterward, all of those copies might get wiped out in turn by some other more efficiently replicating fragment. Soon, every byte’s history becomes very brief in time, yet complex in space—a short-lived snarl of sideways jumps. The loom becomes all weft, and no warp.

Are these scrappy replicators competing or cooperating? Both. Replicators that can’t keep up are wiped out, along with any non-replicating bytes. Surviving replicators, on the other hand, continually form chimeras,[^51] recombining with *other* replicators (or even copies of themselves) to become more effective still. These are, once more, symbiogenetic events: sub-entities merging to form a larger, more capable super-entity.

This chaotic phase is such a potent crucible for directed evolution that it generally doesn’t last long. It rapidly produces a robust whole-tape replicator, which then takes off exponentially, resulting in the dramatic transition to organized structure (and large amounts of computation) that are bff’s most obvious feature. This is when artificial life *seems* to spontaneously emerge.

But as we can now appreciate, there’s nothing spontaneous about it. Replicators had been there all along, and each larger replicator is composed of smaller ones—an inverted tree of life, consisting of mergers over time rather than splits.{% endmedia %}

However, evolution’s creative work is not done yet. After the takeoff of a fully functional tape replicator, we often see yet further symbiotic events. From a classical Darwinian standpoint, this seems puzzling, since there should be no reason for further evolution to take place once whole tapes are replicating reliably. How could “fitness” possibly improve further, once a tape copies itself in its entirety every time it interacts with another tape?

We must consider that since the instructions for whole-tape replication don’t occupy all 64 bytes, there’s extra space on the tape that could be dedicated to … anything. That’s the point of von Neumann–style replication—it allows for open-ended evolution precisely because the tape can contain additional information, beyond the code needed for replication itself.[^52]

Any extra replicated bytes could, of course, be random—just passive, purposeless information cargo hitchhiking from one generation to the next. But if these bytes contain instructions, those instructions can run. And if they can run, they can replicate *themselves*, too. Thus, the symbiogenetic process can continue to operate, creating additional replicators *within* an already replicating tape. Sometimes these sub-replicators even produce multiple copies of themselves in a single interaction.

Sub-replicators can interact with their host in many ways. They can “kill” the host by damaging *its* replication code, which is generally catastrophic for the sub-replicator, as it thereby destroys the environment within which it can run. Sub-replicators can be neutral, leaving the host’s replication machinery alone. Or, they can be symbiotic, for instance by conferring resistance to mutational damage via redundant copying of the host’s code. The overall tendency is toward symbiosis, since that is the most dynamically stable.

Over time, code colonizes a large proportion of the 64 bytes. Code is more dynamically stable than non-code, and its dynamic stability increases through symbiosis with yet more code—in particular, when code fragments find ways to work in functional tandem.

In a way, symbiosis is the very essence of functionality. When we talk about a kidney’s function only making sense *in context*, we mean that it is in symbiosis with other functions—like those of the liver (breaking ammonia down into urea), the heart (pumping blood), and so on. Each of these functions is *purposive* precisely because its inputs are the outputs of others, its outputs are inputs to others, and thus they form a network of dynamically stable cycles.

The same is true of larger, planetary-scale interrelationships. The “purpose” of plants, from the perspective of animal life, is to produce oxygen and sugar, which we breathe and eat. The “purpose” of animals, from a plant’s perspective, is to turn the oxygen back into carbon dioxide, and provide compost and pollination. Our growing understanding of life as a self-reinforcing dynamical process boils down not to *things*, but to networks of mutually beneficial *relationships*. At every scale, life is an ecology of functions.

Because functions can be expressed computationally, we could also say that life is code, and code is life. Individual computational instructions are the irreducible quanta of life—the minimal replicating set of entities, however immaterial and abstract they may seem, that come together to form bigger, more stable, and more complex replicators, in ever-ascending symbiotic cascades.

In the toy universe of bff, the elementary instructions are the seven special characters “\<\>+−,\[\]”. On the primordial sea floor, geothermally-driven chemical reactions that could catalyze further chemical reactions likely played the same role. Under other conditions, on another planet, or in another universe, many different elementary interactions could do the same—as long as they are Turing complete, enabling them to make the leap from autocatalytic sets to true replication.

{% endchapter %}  

{% chapter 'virality'%}  
{% chapter_opener %}  
## Virality

**Although bff is only a toy universe, it can serve as a simplified model for life and evolution, just as a Newtonian billiard-ball universe can serve as a simplified model for the thermodynamics of ideal gases.** 
{% endchapter_opener %}  

As we’ve seen, some of bff’s predictions are quite different from those of classical Darwinian theory:

1. Bff suggests that symbiogenesis is a more important driver of evolutionary innovation than random mutation.  
2. Since symbiogenesis must involve combinations of pre-existing dynamically stable entities, we should expect complex replicating entities to emerge after (and be made of) simpler ones.  
3. As a result, zooming in on sub-replicators within a larger replicator should allow us to peer back in evolutionary time.[^53]

These phenomena should sound familiar\! They’re all consistent with Lynn Margulis’s observations, which flew in the face of twentieth-century biological orthodoxy, but are now, if not mainstream, at least gaining respectability.

But wait, there’s more:

4. Due to the instability of the imperfect replicators leading up to the first true replicator, we should expect this first true replicator to be a historical “event horizon,” becoming the template for what follows and erasing independent traces of what came before.

This is what we see on Earth too. Although the first chemical steps toward proto-life may still be taking place in environments like black smokers, we don’t see the missing links. Where are the kind of imperfect replicators that fused together to form the simplest life forms today?

We likely don’t see them on their own because, as in bff, their instability made them ephemeral, quickly displaced or absorbed by the first stably replicating cell—which might already have been recognizably kin to today’s bacteria and archaea. (Evolutionary biologists call this the “Last Universal Common Ancestor” or LUCA.) Still, we can assume that many of the component *parts* of the most ancient surviving life forms—like the reverse Krebs cycle and RNA replication—are fossilized fragments of earlier imperfect replicators.

In the same vein:

5. Evolved code should not only include instructions for replicating itself as a whole, but also be rife with sub-sequences that contain instructions for independently replicating *them*selves.  
6. If symbiosis among these parts generated the novelty driving evolution of the whole, we should see evidence in the genome of many “broken” or incomplete sub-replicators.  
7. Code that evolved through such hierarchical symbiotic replication should also contain many sequences that are repetitive, or are copies of other parts.

We can find all of these features in our own genetic code—and they don’t correspond to what we would expect to see if our genomes had evolved primarily through mutation and selection.

{% img 'genome' %}When the first complete human genome sequence was published in 2000, some surprises were in store.[^54] One was the astonishingly high proportion of so-called “junk DNA” that doesn’t code for proteins: about 98%. How did it get there? Is it actually *doing* anything? We now understand that some of this “junk” is involved in gene regulation, but most is still of unknown or uncertain function. Close inspection reveals, though, that much of our code, whether “junk” or otherwise, is … *viral*.{% endimg %}

The reproductive cycle of viruses is an often-told story. When traveling between cells, a virus looks like a bit of DNA or RNA packaged into a protein “envelope” capable of binding to a target cell and injecting its genetic payload. Once inside the cell, the viral code hijacks cellular resources to begin replicating, both copying its genetic material and manufacturing its envelope proteins. These assemble into more viruses. Maniacally cranking out viral proteins, the cell may eventually burst, releasing a flood of virus particles to repeat the cycle.

“Retroviruses” like HIV (the Human Immunodeficiency Virus, which causes AIDS) include additional “reverse transcription” machinery for permanently incorporating their genetic material into the cell’s DNA. This makes them a lot harder for the host to clear. The key enzyme, “reverse transcriptase,” wasn’t characterized until 1970,[^55] but Barbara McClintock (1902–1992), working at Cold Spring Harbor Lab on Long Island, had made an earlier discovery that turned out to be closely related.

{% img 'mcclintock' %}While studying the genetics of maize plants in the late 1940s and early ’50s, McClintock found mobile segments of DNA that seemed to be able to cut and paste themselves into different locations on the genome, producing differently mottled color patterns in corn kernels.[^56] Although many of her colleagues were initially skeptical about these “transposons” or “jumping genes,” McClintock eventually won the Nobel Prize for this work.

A much wider zoo of “transposable elements” has since been discovered, some of which don’t just “cut and paste,” but “copy and paste” themselves; they are, in effect, replicators *within* our DNA. In fact, some of them are fully fledged retroviruses, including instructions not only for splicing their code into a host cell’s genome, but also for envelope proteins, allowing that code to venture out into the world in search of other cells to infect.{% endimg %}

Retroviruses are unsettlingly … *intimate*. HIV specifically targets immune cells, but if a retrovirus infects an egg or sperm cell, it can insert its code into an organism’s germ line, becoming a permanent part not only of that cell, but of an entire species. In a 2006 publication in the prestigious journal *Nature*, researchers at the University of Queensland in Australia reported catching a retrovirus in this act of becoming “endogenous” for the first time.[^57] An epidemic of leukemia in koalas had first been traced to a retrovirus, then this retrovirus was found to have invaded the koala germ line over the previous century, causing the disease to become heritable.

Does this mean the end of koalas? Probably not.

The human genome is rife with signs that the same process has taken place many times in the history of our own species. At least 8% of our genome consists of endogenized retroviruses, the remnants of such retroviral invasions.[^58] Remember, 8% is several times more DNA than codes for our “own” genes\!

We usually think of viruses as mere disease agents, opportunistically parasitizing our cells to reproduce, since they have no reproductive machinery of their own. The reality may be very different, though. As many of us know from our recent experience with COVID,[^59] viruses (and pathogens in general) tend to evolve into forms less lethal to their hosts over time, for obvious reasons—a dead host is a dead end for the pathogen, too. There’s mounting evidence that the relationship between virus and host can go even further, to become symbiotic. Retroviral code in our genome, for instance, has become fundamental to the formation of the placenta, the immune system, cell differentiation, and brain function.[^60]

Moreover, endogenous retroviruses are only the tip of an even larger iceberg. Nearly half of our genome consists of transposable elements of one kind or another. Some were probably once retroviruses, or vice versa. Fully sequenced genomes are often rife with lengthy stretches of highly repetitive sequences, from long and complex to mere alternations of two or three symbols—evidence of sub-replicators running amok.

Our genomes, in other words, are not only reproduced as a whole, but include working reproductive sub-sequences at many scales. Some are new and can still cause disease; others are older and may have lost the ability to make viral envelopes or the other machinery needed to become infectious; and yet others have integrated themselves so deeply into our own code that they are no longer distinct. Some of this code is even serving critical functions in our bodies. It’s obvious that, at least by this last stage of the process, complete symbiosis has been established: neither the host nor the sub-replicator could survive, let alone reproduce, on its own.

In his 2009 book *Virolution*,[^61] author and physician Frank Ryan goes further, arguing that viruses may have been symbionts all along. Plague viruses like HIV don’t come from nowhere; they are species jumpers. We know that HIV was originally SIV, the Simian Immunodeficiency Virus, variants of which are endemic to Old World primates including African green monkeys, sooty mangabeys, mandrills, and chimpanzees. Yet many of these viruses don’t sicken their original hosts.[^62]

We also know that if a virus finds itself inside an organism whose physiology is *too* different from that of its original host, it can’t gain purchase—a lucky thing for you, if you’ve ever swallowed a mouthful of seawater, which likely contained about a billion virus particles\! (Most would have targeted single-celled marine life.) The greatest danger seems to come from viruses adapted to a different but closely related species. Perhaps, when it kills, such a virus is doing its job: wiping out rivals who have invaded the original host’s territory.

Viruses could, in other words, work like an out-of-body immune system. Within our bodies, our immune systems seek out and destroy cells that are recognized as “not-us.” Outside our bodies, “our” viruses could be similarly seeking out and destroying whole animals who are recognized as “not-us.” Once a virus becomes endemic to a new population, though—even if it initially kills many—it will differentiate, co-adapt, and perhaps eventually go native.

One could consider bacterial pathogens through a similar lens; hence the well-documented plagues of smallpox that European colonists brought to the Americas, decimating Native populations, and the virulent (though less deadly) syphilis epidemic believed to have been brought back to Europe by Columbus.[^63] Unlike bacteria, though, retroviruses don’t just take up residence in our environment or in our bodies, but fuse into our very genomes, becoming inextricably part of us—especially when they alter the germ line.



By sheer volume, our DNA appears to be made primarily of the layered remnants of many such past fusions. It seems clear that transposable elements and “endogenous viral elements” or EVEs have done much more editing of our genome in recent evolutionary history than mutation has.[^64] And they have been at this for a long, long time. Based on the best available evidence, viruses are at least as old as the Last Universal Common Ancestor, if not older.[^65]

{% img 'bovb' %}

This ongoing ecology of mobile, self-reproducing, and even infectious genes causes the supposed “tree of life” to continue entangling with itself in the oddest ways. Fully a quarter of the cow genome, for instance, consists of copies of the retrotransposon BovB. BovB appears to have leapt many times between species to create a phylogenetic tree of its own, a “bizarre parallel universe where cows are more closely related to snakes than to elephants, and where one gecko is more closely related to horses than to other lizards.”[^66] These are instances of “horizontal gene transfer” (HGT), long associated with bacteria, but clearly more universal.[^67]

 {% endimg %}

{% img 'monster' %}Whether a bit of new DNA is acting in the moment as friend, foe, or somewhere in between is really just a matter of where on the symbiotic trajectory it falls. When brand new, it’s unlikely to be friendly. But if it has persisted for a long time, and especially if it has become endogenous, its dynamic stability implies that it will have become non-lethal or even friendly due to combined evolutionary pressures on host, invader, and “host plus invader” as a “holobiont” or symbiotically fused entity. When some gene or other functionality in the fused code proves valuable to the larger whole, that functionality will be conserved, even as the sub-replicator’s reproductive capability degrades and eventually vanishes. Perhaps that is how new genetic functionality arises in general.{% endimg %}

In this light, random point mutation can even be seen as something like a minimal abiogenesis event, creating a tiny parasitic “life form” within the genome. On its own, it would of course be unable to reproduce, since it possesses no independent reproductive machinery;[^68] then again, neither does a virus. So, like a virus, a mutation *can* reproduce—using the host’s resources, which will copy it along with everything else. When introduced into the genome of a sophisticated existing organism, such a tiny, random entity is unlikely to be friendly, though, as with any larger invasion, it will either kill its host (and itself, in the bargain) or achieve dynamic stability, either by being neutral or (occasionally) helpful.

Hence, just as replicator thermodynamics encompasses classical thermodynamics as a special case, evolution via symbiogenesis can encompass classical Darwinian theory as a special case. Point mutation is unlikely to be the main driver of evolution once life has taken off because it’s so much weaker and slower on its own than higher-order symbiogenesis. Unlike point mutation, a chunk of code that has already circulated, jumping around in the genome or even between species, isn’t random. It necessarily includes real functionality. And at least in some settings, that functionality has been under evolutionary pressure to help, or at least not kill, its host. Evolution picks up steam over time, with major evolutionary transitions becoming more frequent precisely because increasingly high orders of symbiogenesis become possible.

{% endchapter %}  
{% chapter 'compression'%}  
{% chapter_opener %}  
## Compression

**When code evolves through symbiogenesis, it will develop a curious statistical structure: parts of it will be copies (or near-copies) of other parts, and as those parts establish symbiosis, they’ll form a larger aggregate which will *also* copy itself as a unit.** 

This is reminiscent of (though not the same as) a “fractal”: a structure that resembles itself at a cascade of ever-finer scales. Let’s take a short detour through fractals and their relationship to biology so that we can then consider the implications of evolution *itself* exhibiting certain fractal-like properties.{% endchapter_opener %}  
{% img_x 'britain' %}French-American mathematician Benoit Mandelbrot (1924–2010) is the figure most associated with fractals, though they were first described by English meteorologist Lewis Fry Richardson (1881–1953). In the aftermath of World War II, Richardson, a Quaker, had been trying to build a mathematical model to predict the likelihood of conflicts between countries. One of the parameters in his model was the length of their common border. He was perplexed to find, though, that certain borders didn’t appear to have agreed-upon lengths. The Portuguese, for instance, reported that their border with Spain was 613 miles long, but the Spanish claimed that it was 754 miles long. This seemed like a weirdly large discrepancy for what ought to have been an easily surveyed distance\!

Richardson eventually figured out what was going on: the Spanish were using a higher-resolution map. Every twist and turn the Portuguese could see in the Minho, Douro, and Guadiana rivers separating the countries had finer-scale twists and turns only visible on the Spanish map. Richardson showed that, if zooming in on any given meandering revealed more meanderings, the total length of a “self-similar” curve like a coastline or a river can grow without limit as one measures it with an ever-smaller ruler.[^69]{% endimg_x %}

“Fractal geometry” is thus very different from the Euclidean geometry we all learned in school, where the length of a line or curve is well-defined and doesn’t blow up when you zoom in. Of course, in real life, one can’t zoom in forever, but fractals are still important mathematical tools for understanding structures that are self-similar over a range of scales, like rivers and coastlines.

{% img 'allometric' %}Living organisms exhibit obvious fractal properties in certain of their structures, such as tree branches, bronchial tubes, and circulatory systems. In structures like these, fractal geometry over some range of scales offers an elegant design solution to a biophysical problem. For instance, blood carrying oxygen and nutrients needs to reach every cell in the body, which means that oxygenated blood has to be pumped through a branching network of tubes, and these tubes—which are, in Euclidean terms, one-dimensional—have to repeatedly subdivide to “fill” three-dimensional space. Hence, we have fractally branching (and then merging) networks of arteries, arterioles, capillaries, venules, and veins.{% endimg %}

{% img 'mandelbrot67' %}By working out the design properties of such fractal networks and their implications, theoretical physicist Geoffrey West and his collaborators at the Santa Fe Institute have figured out many fundamental “scaling laws” in biology.[^70] One of the most well-known results from this body of work explains why every mammalian heart will beat about 1.5−2 billion times over a lifetime, whether it belongs to an Etruscan shrew (weighing a twentieth of an ounce, and living a year or so), or a blue whale (weighing over 300,000 pounds, and living about a century).

Self-similarity in general yields “power law” scaling relationships, which look like straight lines when plotted on logarithmic axes.[^71] Body mass, for instance, has power-law relationships with metabolic rate, the total length of the circulatory system, and lifespan.[^72] Combining various power-law relationships to calculate the number of heartbeats in a lifetime causes all the scaling variables to cancel out beautifully, yielding the famous 1.5−2 billion beat constant. While the theory is not exact (humans, for example, live somewhat longer than predicted), it does a remarkable job of parsimoniously explaining a wide range of phenomena.{% endimg %}

{% img_x 'mandelcurve' %}Is life in general a kind of fractal, then? No. A rhyme by British mathematician Augustus De Morgan[^73] is often invoked in describing fractals: 

*Great fleas have little fleas upon their backs to bite ’em,*  
*And little fleas have lesser fleas, and so* ad infinitum*.*[^74]

The poem is funny precisely because it is absurd: unlike an idealized fractal coastline, living systems are, in general, profoundly *dis*similar across scales.[^75] While there are rare instances of the kind De Morgan describes—such as hyperparasitoid wasps, tiny parasites that lay their eggs inside bigger wasps—one does not generally zoom in on a flea to discover a smaller flea, let alone *ad infinitum*.


Indeed, even coastlines are best characterized, in real life, as “multifractals”: systems with repetitive structure at every scale, but variability *across* scales.[^76] As a result, their power laws may also vary. For instance, zooming in twofold at one level of magnification, where the ruggedness is especially pronounced, might cause the apparent length to scale up by 21.5≈2.83, while zooming in twofold at a magnification where the coastline appears smoother might only cause the apparent length to scale up by 21.16≈2.24. Every bump has bumps on it, but the bumps at one scale are shaped differently from the bumps at another.[^77]
{% endimg_x %}

Similarly, although genomes are always replicated, and are made out of other genomes that are themselves replicated, every whole is different from its parts, just as an integrated circuit is different from a transistor. How, then, would one go about quantifying this multifractal-like property in a genome?

The answer is closely related to data compression. Consider bff. In its initial state, the tapes consist of random bytes; no repetitive structure exists. If we were reading through the tapes one byte at a time, the next byte would have an equal probability of assuming any value, from 0 to 255, independent of any of the previous bytes. Therefore, the sequence is entirely unpredictable, which means that if you were to try compressing the soup with file compression software, like ZIP, the compressor wouldn’t be able to squeeze the file size at all. (This is, harkening back to thermodynamics, a working definition of a completely disordered state.)

Data are redundant—that is, compressible—precisely to the degree that they are predictable, or, equivalently, exhibit order. Compression algorithms like those in ZIP work by looking for patterns in the data stream so far and exploiting those patterns to encode subsequent data using as few bits as possible. The usual trick is to incrementally build a dictionary or “phrase book” out of the source material, and to substitute sections of the text for pointers into this dictionary whenever the pointer can be encoded in fewer bits than the original text. The dictionary is, in effect, a predictive model, and since the compressor builds that model incrementally as it compresses, the decompressor is able to incrementally reconstruct an identical copy of the model as it *de*compresses.

Absent any prior knowledge about how to model a long sequence, describing it in terms of previously encountered parts of itself is a good strategy. The full text of this book ZIPs down to about 35% of its original size as a raw text string, since some letters occur more often than others, there are a lot of repeated words, and those words often combine into stock phrases.[^78]

When bff undergoes its sharp transition to whole-tape replication, the tapes suddenly become highly compressible; they squeeze down to just 5% of their original size. Interestingly, many regions of the human genome are highly compressible too. The reason these data streams compress so well is that, at any given point in the sequence, one can often make a pretty good guess as to what the next letter will be, simply by looking for the longest previous sequence that matches the current context.

Such matches arise due to replication. In the human genome, we’re not talking about replication at the level of the individual, but, rather, at the level of transposable elements (or their fossil remnants) *within* our genome. Similarly, even a *single* bff tape is highly compressible, because it formed through a symbiotic fusion of smaller replicators … and these replicators are themselves likely to be either copies of each other or related, having formed out of yet smaller imperfect replicators … which are themselves either copies or related.

Like fractals, sequences of symbols constructed by repeatedly copying sub-sequences of all lengths exhibit power-law scaling—in this case, between the lengths of repeated sequences and their frequency. For instance, a replicated sequence twice the length of another might be found half as often—which is pretty often\! (These statistics would be dramatically different for random sequences, where increasing the sequence length would cause a much faster *exponential* decline in expected frequency.[^79]) Sequences constructed according to a fixed self-copying rule are, in a sense, infinitely compressible, for they contain only as much information as it would take to write down the recipe, no matter how long the sequence.

By contrast, in a complex replicating system like bff—let alone the genome—the *way* any particular set of replicating sub-sequences combine to form a larger replicating sequence will always be specific. It will depend on the functional particulars of how those parts come together to make a working whole. Therefore there is novelty, or information, in each such combination. However, that information will be much less than would be needed to specify an arbitrary symbol sequence of the same length.

When we look for this property in bff and in human genome data, that’s just what we find\! Not only do both compress very well; they also compress better and better the longer the stream of data gets. For instance, a single bff tape compresses somewhat, but the whole soup compresses better, and as the size of the soup grows, the compression ratio continues to improve—though no matter how much has already been seen, the remainder is never fully predictable.

Similarly, while a single stretch of a human genome already compresses well, the whole genome compresses better. If you compress it in the statistical context of many other human genomes, so much of the information becomes redundant that a compressed version of *your* genome would be small enough to send as an email attachment.[^80] The pattern continues if we zoom yet farther out to consider genomes across species. Hence the famous statistic that the human genome is 98% identical to the chimpanzee genome … and 60% similar to that of the fruit fly\!

While common ancestry alone can explain many of the similarities across species (though not all, as BovB illustrates), such classical Darwinian arguments can’t explain why the genome of a single individual is also so repetitive. That only makes sense when we begin to consider genomes to be *made out of* smaller genomes.

DNA and bff tapes, in other words, are both systems that evolve through what we could call “multifractal symbiosis.” Our genomes are aggregates of cooperating replicators, all the way down. That’s why they are so compressible. But it’s also why wonderful new kinds of complexity emerge at every scale—and therefore why, in biology, we can always learn something new by zooming in or out.

{% endchapter %}  
{% chapter 'embodiment'%}  
{% chapter_opener %}  
## Embodiment

**There’s a profound yet subtle relationship between the multifractal properties of our bodies and the multifractal properties of the genome.**

The relationship is subtle because the genetic code is by no means a one-to-one blueprint explicitly representing the body’s final shape. One might imagine, for instance, that because a snake has hundreds of ribs, it might have a stretch of DNA coding for a vertebra and rib pair, which might have replicated itself a few hundred times in the snake’s genome. Could snakes be the result of a retrotransposon coding for ribs run wild, like BovB?{% endchapter_opener %}  

{% img 'snake' %}Not exactly. So-called “Hox” genes, shared widely among animals, control overall body plan, and they “execute” their program using a combination of gene regulation and the kind of distributed computation Turing described in his work on morphogenesis. During embryonic development, ribs begin as a chemically controlled spatial oscillation, like the stripes of a tiger.{% endimg %}


This mechanism is vastly more powerful, general, and evolvable than merely replicating some “build a rib” code. It allows for code reuse, just as a programmer would do: invoking the same “build a rib” function a hundred times instead of copying and pasting it a hundred times. Thus, tweaking rib flexibility or curvature involves making one change, not a hundred.

{% img 'antp' %}Evolution can produce real programs that reuse code because life is computational. Remember that if you’re a replicator of the kind von Neumann described, you need to contain instructions for building yourself, including a machine B to copy those instructions, and a machine A, the “universal constructor,” to follow them. The universal constructor is the engine not only of reproduction, but also of growth, development, healing, and maintenance. It created your circulatory system and skin during embryonic development; it also heals your skin and replaces the torn capillaries underneath when you get a cut. As long as you are alive, your body will be continuously constructing and reconstructing itself. The code never stops running.

And since a universal constructor is a kind of Universal Turing Machine, its computations, or equivalently mathematical functions, are inherently “compositional”: complex functions (or programs) can be made out of sub-functions, which can in turn be made out of sub-sub functions … until, at bottom, everything could be expressed in terms of the elementary instructions of a Turing machine.{% endimg %}

{% img 'nautilus' %}Functions can even be made out of *themselves*. In computer science, this is known as “recursion.” The Fibonacci sequence, for example—1, 1, 2, 3, 5, 8, 13, 21, and so on, where each number is the sum of the previous two—is most easily expressed as the recursive function *f*(*n*)=*f*(*n*−1)+*f*(*n*−2) for numbers greater than 1, with f(0)=f(1)=1. We find Fibonacci numbers in biology all the time, as in the spiral pattern of a pine cone, the head of a sunflower, and the chambers of a nautilus. This is a clue that recursive computation takes place in the construction of pine trees, sunflowers, and nautiluses.[^81]{% endimg %}

The smoking gun, though, is the growth of self-similar structures in the body. Compositionality and recursion are what allow genetic code to build a many-tiered fractal like the circulatory system. Code for building ribs or nautilus segments could, in theory, just be copied a couple of hundred times, but that’s not possible for arteries, veins, or capillaries, where the number of segments and branches becomes astronomically large. The blood vessel branching code *must* get reused. And with relatively minor tweaks, it must be possible for the parameters of that code to be adjusted so that the branching stops at the appropriate size for a shrew, or goes on to construct something the size of a blue whale, since shrews and whales are, in the grand scheme of things, close relatives.

From an evolutionary perspective, compositionality implies a hierarchical network of symbiotic relationships. The bacteria that became mitochondria and the archaea that engulfed them each started with the code necessary to reproduce themselves. When they merged into a eukaryote, they still needed to retain the instructions for their own reproduction, but they also needed to evolve additional functionality for mutual regulation. When eukaryotes became multicellular, the same needed to happen again; our cells still know how to reproduce individually, and, indeed, cellular reproduction is a fundamental operation involved in the larger-scale growth and reproduction of a whole animal.

What is true of evolution is also true of development.[^82] Blood vessels, for instance, aren’t just Euclidean line segments, but tubes made of layers of smooth muscle cells. Each of those cells contains a complement of organelles, and each mitochondrion in each of those cells contains its own membranes and loop of bacterial DNA. A living organism is a compositional structure *par excellence*. It could only be built computationally, through the composition of many functions. And life could only have evolved as the hierarchical composition of those functions—that is, through symbiogenesis.

{% endchapter %}  
{% chapter 'elan-vital'%}  
{% chapter_opener %}  
## Élan vital

**Nowadays, we interact with human-engineered (or, one could say, “artificial”) computers constantly: the phones in our pockets and purses, our laptops and tablets, data centers and AI models.** 

We’ve begun asking whether AI models are intelligent. We could ask an even more jarring question: are computers, whether they’re running AI or not, *alive*?[^83]{% endchapter_opener %}  

They are certainly purposive, or we couldn’t talk about them being broken or buggy. But hardware and software are, in general, unable to reproduce, grow, heal, or evolve on their own, because engineers learned long ago that self-modifying code (like bff, or DNA) is hard to understand and debug.[^84] Thus, phones don’t make baby phones. Apps don’t write new versions of themselves.

And yet: there are more phones in the world this year than last year; apps acquire new features, become obsolete, and eventually reach end-of-life, replaced by new ones; and AI models are improving from month to month. Electronic components and computer code also exhibit the same kind of compositionality we’ve seen in bff and DNA. It certainly *looks* as if technology is reproducing and evolving\! Debating its aliveness is thus a bit like the debate over whether viruses (which also can’t reproduce on their own) are alive.

If we zoom out, though, putting technology and humans in the frame together, we can see that this larger, symbiotic “us” is certainly reproducing, growing, and evolving. The emergence of technology, and the mutually beneficial—if sometimes fraught—relationship between people and tech is nothing more or less than our own most recent major evolutionary transition. Technology, then, is not distinct from nature or biology, but merely its most recent evolutionary layer.

And what about that age-old inanimate stuff—rocks and rivers, mountains and beaches, clouds and storms? Water molecules in themselves are clearly not capable of general computation, and yet, in the context of the hydrologic cycle, clouds, rainstorms, and rivers certainly serve critical ecological functions, and are profoundly shaped by life. Likewise, our planet’s metal and sand get shaped into steam engines and computer chips. All of these are part of that grand network of interdependency we call Earth. Why do we draw boundaries around certain networks of functions and insist that they are “alive,” while the surrounding functions are not?

This way lies vitalism, a view espoused in various forms by a long line of philosophers from Posidonius of Apameia (circa 135–51 BCE, and undoubtedly reflecting a much older tradition) to Henri Bergson (1859–1941). Some modern thinkers, too, defend the vitalist position, such as Jane Bennett:

“The quarantines of matter and life encourage us to ignore the vitality of matter and the lively powers *of* material formations \[...\]. By ‘vitality’ I mean the capacity of things—edibles, commodities, storms, metals—not only to impede or block the will and designs of humans but also to act as quasi agents or forces with trajectories \[...\] or tendencies of their own. \[... Our\] analyses of political events might change if we gave the force of things more due.”[^85]

We resist such ideas because we tend to reserve the notion of agency only for ourselves. The idea of agency in a molecule or a storm, let alone an abstraction like money, seems especially far-fetched. We also tend to think in terms of a hierarchy in which “we” (for whatever value of “we”) are at the top, and agency must surely diminish for anything “lower”—a view reminiscent of the medieval Great Chain of Being. When we (hesitantly) extend “agency” to the nonhuman, we tend to do so only for things that act obviously, individually, and on fast timescales, rather than in the aggregate and on slower, more evolutionary ones. It might be time to re-examine these ideas more holistically.

My purpose here is not to follow in Bennett’s footsteps—though I do find her project worth taking seriously. Language is, necessarily, imprecise, no matter what definitions we pick. This doesn’t mean that words are useless, though. When our language can become more rigorous and scientifically grounded, and when we use it to describe patterns across a wide range of phenomena, we can start to see through ideological thickets.

I hope I have explained both clearly and rigorously how the phenomena that give rise to the complexifying dynamics of life apply much more broadly than to the entities we normally think of as “alive” or “agential.” Accordingly, we could expand our definitions of these existing words, or adopt new ones, or do a bit of each. Personally, I would find some broadening of the old everyday words helpful.

That would hardly break new ground. Many traditional, nominally “prescientific” worldviews embrace notions of aliveness, agency, and even personhood that are far broader than the modern Western ones. This seems a likely case of convergent evolution in languages and ideas, motivated by the common need among traditional societies to take symbiosis seriously to secure their own survival, and to flourish. It’s practical as much as it is spiritual: encouraging richer modeling of agency in “nature” enhances a society’s dynamic stability, since all things in “nature,” ourselves included, are so mutually interdependent.

Thus it can be useful to take the view of an animal, plant, or river at times, even if they can’t take ours, the better to care for them—and for ourselves. That, ultimately, is the best reason to consider adopting, or at least adapting, a more inclusive view of the animate. Potawatomi writer and biologist Robin Wall Kimmerer makes this case eloquently in her book *Braiding Sweetgrass*.[^86]

{% img 'uluru' %}In agreeing with Kimmerer, I am not encouraging superstition. When scientists castigate animist beliefs as superstitious, they typically appeal to the materialist discoveries of the Enlightenment, which show that the atoms that make up our bodies are no different from the atoms that make up rocks or air. This is true. Atoms are atoms; they all obey the same rules. Hence, the Enlightenment model of a clockwork universe, governed by dynamical laws.

Yet as Schrödinger pointed out in 1944, our understanding of these laws—which he played such a central role in developing—remains incomplete. The laws as they stand do not account for the complex, dynamically stable, symbiotic phenomena that comprise so much of our experience on Earth—indeed, without which there would be no such thing as experience at all. There would be no life, or purpose, or minds, or agency.

As we both embrace scientific rigor *and* start to figure out those “‘other laws of physics’ hitherto unknown,”[^87] we should perhaps be less surprised to find the shoe on the other foot. What the poet Dylan Thomas called “the force that through the green fuse drives the flower”[^88] drives all atoms, not just the ones we presume to be alive.{% endimg %}

{% endchapter %}  
{% chapter 'acknowledgments'%}  

# Acknowledgments

Although this is a small book, it (appropriately enough) nestles into a tangled heterarchy of larger projects, owing its existence to a great many people and several institutions—especially Google, Antikythera, the Berggruen Institute, the Santa Fe Institute, the Mila-Quebec AI Institute, and MIT Press. Many of the people I’ll thank below are affiliated with more than one of these.

As a designed object, this book’s co-creator is James Goggin of Practise, in Auckland. Our third collaboration, *What Is Life?* further develops an approach to simultaneously physical and digitally native media we’ve established with our first two projects, *Ubi Sunt* and *Who Are We Now?* (both published by Hat & Beard Press, with warm thanks to JC Gabel).

Clea Agüera-Arcas, Loraine Agüera-Arcas, and Johan Michalove have helped research, edited painstakingly, offered line-by-line critique, chased down sources and permissions, coded workflows, wrangled spreadsheets, and in short dedicated an immense effort over many months to making the book as beautiful, readable, fair, and accurate as we could. Brian Sholis did the final editing and proofreading. However, I take sole responsibility for any remaining errors or omissions, and all opinions, mistaken or not, are my own.

In collaboration with James Goggin, Minkyoung Kim and Marie Otsuka designed and implemented the web version, which includes a good deal of video and interactive content. The simulations owe a heavy debt to Alex Mordvintsev (also the inventor of neural cellular automata), and his elegant SwissGL library.

Close readings of the text and detailed editorial input, which improved the final result significantly, came from Benjamin Bratton, Stephanie Sherman, Adrienne Fairhall, Anselm Agüera y Arcas, Eliot Agüera y Arcas, David LeBrun, Ben Laurie, Luca Versari, David Wolpert, and Emily French. Warm thanks also to Patricia Churchland, Walter Fontana, N. Katherine Hayles, Reid Hoffman, Michael Levin, Johan Liedgren, Charles Mudede, Addy Pross, Carl Schoonover, Terry Sejnowski, Justin Smith-Ruiu, Dan Sperber, Korina Stark, John Thornhill, Sara Walker, and Ren Weschler. Thank you, Margaret Levi and Bob Kaplan, for connecting me with Papunya Tula Artists in Australia’s Western Desert, and thank you, Spike Mafford, for the beautiful photography. Yalti Napangati’s artwork, which envelopes this book, is the most eloquent expression of symbiogenesis.

At Google, I owe deep thanks to James Manyika and Sundar Pichai for giving my team, Paradigms of Intelligence (PI), the freedom and resources to pursue interdisciplinary basic research. I’m grateful to Demis Hassabis and Yossi Matias for their support of internal collaboration with Google DeepMind and Google Research, respectively, and to Yul Kwon for his deft co-leadership of PI. A big thank you to PI teammates and collaborators: Jyrki Alakuijala, Kenric Allado-McDowell, Travis Beals, Sami Boukourtt, Martin Bruse, Iulia Comșa, Yiğit Demirag, Moritz Firsching, Thomas Fischbacher, Alice Guan, Florian Hartmann, Anthony House, Geoff Keeling, Evgenii Kliuchnikov, Seijin Kobayashi, Marcin Kowalczyk, Rachelle Lacroix, Mira Lane, Alison Lentz, Brittni Maekawa, Kaitlin Maile, Delaney McMillen, Alexander Meulemans, Alex Mordvintsev, Eyvind Niklasson, Peter Norvig, Robert Obryk, Ettore Randazzo, Esteban Real, João Sacramento, Mark Sandler, Rif Saurous, Nino Scherrer, Anoop Sinha, Oliver Siy, Winnie Street, Zoltan Szabadka, Luca Versari, Sarah de Haas, and Johannes von Oswald. Visiting faculty James Evans, Guillaume Lajoie, and Blake Richards have been wonderful friends and colleagues, and have all made intellectual contributions to the material presented here.

Time spent at the Santa Fe Institute over the past two years has profoundly influenced my perspective on life, complexity, and intelligence. I have also met a number of new collaborators, fellow travelers, and constructive critics (often a bit of each) there, including Kevin Berger, Sean Carroll, David Chalmers, Ted Chiang, Michael Hersch, Chris Kempes, David Krakauer, John Krakauer, Gary Lupyan, Brice Ménard, Melanie Mitchell, Carlo Rovelli, Zenna Tavares, Geoffrey West, and David Wolpert.

*What Is Life?* and its mothership *What Is Intelligence?* are among the first long-form publications of the Antikythera program, under the direction of Benjamin Bratton. Benjamin has instigated many of my major writing projects in recent years, including these books, and has been a loyal friend and frequent collaborator. Warm thanks also to Haley Albert, Nicolay Boyadjiev, Nils Gilman, Emily Knapp, Dawn Nakagawa, Estela Oliva, Tobias Rees, and Claire Webb; my gratitude, also, to Nicolas Berggruen for his intellectual friendship and support, and to the Berggruen Institute.

Finally, warm thanks to Noah Springer of MIT Press, for believing in this project and for helping us bend the rules of traditional academic publishing.

{% endchapter %}  
{% chapter 'about-the-author'%}  

# About the author

Blaise Agüera y Arcas is a VP and Fellow at Google, where he is the CTO of Technology & Society and founder of Paradigms of Intelligence (PI). PI is an organization working on basic research in AI and related fields, especially the foundations of neural computing, active inference, sociality, evolution, and Artificial Life. In 2008, Blaise was awarded MIT’s TR35 prize. During his tenure at Google, he has innovated on-device machine learning for Android and Pixel, invented Federated Learning (an approach to decentralized model training that avoids sharing private data), and founded the Artists and Machine Intelligence program. A frequent public speaker, he has given multiple TED talks and keynoted NeurIPS. He has also authored numerous papers, essays, op-eds, and chapters, as well as two previous books, *Who Are We Now?* and *Ubi Sunt*. *What Is Life?* is Part I of the larger book *What Is Intelligence?*, forthcoming from Antikythera and MIT Press in 2025\.

{% endchapter %} 
{% chapter 'bibliography'%}  
# Bibliography

[Adami, Chris, and C. Titus Brown. 1994\. “Evolutionary Learning in the 2D Artificial Life System ‘Avida.’” *arXiv \[adap-Org\]*. arXiv.](http://paperpile.com/b/iJBGNj/6Ou0) [https://arxiv.org/pdf/adap-org/9405003](https://arxiv.org/pdf/adap-org/9405003)
[Agüera y Arcas, Blaise. 2023\. *Who Are We Now?* Los Angeles: Hat & Beard, LLC.](http://paperpile.com/b/iJBGNj/I1PA)
[Agüera y Arcas, Blaise, Jyrki Alakuijala, James Evans, Ben Laurie, Alexander Mordvintsev, Eyvind Niklasson, Ettore Randazzo, and Luca Versari. 2024\. “Computational Life: How Well-Formed, Self-Replicating Programs Emerge from Simple Interaction.” *arXiv \[cs.NE\]*. arXiv.](http://paperpile.com/b/iJBGNj/2mU4q) [http://arxiv.org/abs/2406.19108](http://arxiv.org/abs/2406.19108)
[Bagrov, Andrey A., Ilia A. Iakovlev, Askar A. Iliasov, Mikhail I. Katsnelson, and Vladimir V. Mazurenko. 2020\. “Multiscale Structural Complexity of Natural Patterns.” *Proceedings of the National Academy of Sciences of the United States of America* 117 (48): 30241–51.](http://paperpile.com/b/iJBGNj/sdOr)
[Bakoulis, Stylianos, Robert Krautz, Nicolas Alcaraz, Marco Salvatore, and Robin Andersson. 2022\. “Endogenous Retroviruses Co-Opted as Divergently Transcribed Regulatory Elements Shape the Regulatory Landscape of Embryonic Stem Cells.” *Nucleic Acids Research* 50 (4): 2111–27.](http://paperpile.com/b/iJBGNj/AvEV)
[Baltimore, David. 1970\. “Viral RNA-Dependent DNA Polymerase: RNA-Dependent DNA Polymerase in Virions of RNA Tumour Viruses.” *Nature* 226 (5252): 1209–11.](http://paperpile.com/b/iJBGNj/zwxh)
[Barricelli, Nils Aall. 1957\. “Symbiogenetic Evolution Processes Realized by Artificial Methods.” *Methodos* 9 (35–36): 143–82.](http://paperpile.com/b/iJBGNj/cKjJ)
[Bennett, Jane. 2010\. *Vibrant Matter: A Political Ecology of Things*. Durham, NC and London: Duke University Press.](http://paperpile.com/b/iJBGNj/jZ9KK)
[Buchanan, Bon B., and Daniel I. Arnon. 1990\. “A Reverse Krebs Cycle in Photosynthesis: Consensus at Last.” *Photosynthesis Research* 24 (1): 47–53.](http://paperpile.com/b/iJBGNj/tKw5R)
[Carroll, Sean B., Jennifer K. Grenier, and Scott D. Weatherbee. 2013\. *From DNA to Diversity: Molecular Genetics and the Evolution of Animal Design*. EPUB. 2nd ed. Hoboken, NJ: Wiley-Blackwell.](http://paperpile.com/b/iJBGNj/SRYzg)
[Christley, Scott, Yiming Lu, Chen Li, and Xiaohui Xie. 2009\. “Human Genomes as Email Attachments.” *Bioinformatics*  25 (2): 274–75.](http://paperpile.com/b/iJBGNj/Ph38o)
[Chuong, Edward B. 2018\. “The Placenta Goes Viral: Retroviruses Control Gene Expression in Pregnancy.” *PLoS Biology* 16 (10): e3000028.](http://paperpile.com/b/iJBGNj/lnm7)
[Crosby, Alfred W. 2003\. *The Columbian Exchange: Biological and Cultural Consequences of 1492, 30th Anniversary Edition*. New York: Praeger.](http://paperpile.com/b/iJBGNj/kD8C) [https://books.google.com/books?hl=en\&lr=\&id=SXvCEAAAQBAJ\&oi=fnd\&pg=PT15\&dq=The+Columbian+Exchange:+Biological+and+Cultural+Consequences+of+1492\&ots=tQcdcNH-ru\&sig=-tY3njlfbvWNcvjeKuhBCvBRnGc](https://books.google.com/books?hl=en&lr=&id=SXvCEAAAQBAJ&oi=fnd&pg=PT15&dq=The+Columbian+Exchange:+Biological+and+Cultural+Consequences+of+1492&ots=tQcdcNH-ru&sig=-tY3njlfbvWNcvjeKuhBCvBRnGc)
[Dawkins, Richard. 1986\. *The Blind Watchmaker*. New York: W.W. Norton.](http://paperpile.com/b/iJBGNj/y5S44)
[De Morgan, Augustus, and Sophia Elizabeth De Morgan. 1872\. *A Budget of Paradoxes*. London: Longmans, Green.](http://paperpile.com/b/iJBGNj/2F9YB)
[Evans, Michael C., Bob B. Buchanan, and Daniel I. Arnon. 1966\. “A New Ferredoxin-Dependent Carbon Reduction Cycle in a Photosynthetic Bacterium.” *Proceedings of the National Academy of Sciences of the United States of America* 55 (4): 928–34.](http://paperpile.com/b/iJBGNj/nCFk)
[Feschotte, Cédric, and Clément Gilbert. 2012\. “Endogenous Viruses: Insights into Viral Evolution and Impact on Host Biology.” *Nature Reviews. Genetics* 13 (4): 283–96.](http://paperpile.com/b/iJBGNj/DS1xJ)
[Fontana, Walter. 1990\. “Algorithmic Chemistry,” no. LA-UR-90-1959 (June).](http://paperpile.com/b/iJBGNj/KJwB) [https://www.santafe.edu/research/results/working-papers/algorithmic-chemistry-a-model-for-functional-self-](https://www.santafe.edu/research/results/working-papers/algorithmic-chemistry-a-model-for-functional-self-)
[Harper, Kristin N., Paolo S. Ocampo, Bret M. Steiner, Robert W. George, Michael S. Silverman, Shelly Bolotin, Allan Pillay, Nigel J. Saunders, and George J. Armelagos. 2008\. “On the Origin of the Treponematoses: A Phylogenetic Approach.” *PLoS Neglected Tropical Diseases* 2 (1): e148.](http://paperpile.com/b/iJBGNj/qISP)
[Horita, Nobuyuki, and Takeshi Fukumoto. 2023\. “Global Case Fatality Rate from COVID-19 Has Decreased by 96.8% during 2.5 Years of the Pandemic.” *Journal of Medical Virology* 95 (1): e28231.](http://paperpile.com/b/iJBGNj/9X3am)
[Kauffman, Stuart A. 1971\. “Cellular Homeostasis, Epigenesis and Replication in Randomly Aggregated Macromolecular Systems.” *Journal of Cybernetics* 1 (1): 71–96.](http://paperpile.com/b/iJBGNj/MqQWR)
[Kimmerer, Robin. 2013\. *Braiding Sweetgrass: Indigenous Wisdom, Scientific Knowledge and the Teachings of Plants*. Minneapolis, MN: Milkweed Editions.](http://paperpile.com/b/iJBGNj/l1qj)
[Kleene, Stephen Cole. 1938\. “On Notation for Ordinal Numbers.” *Journal of Symbolic Logic* 3 (4): 150–55.](http://paperpile.com/b/iJBGNj/PD5o)
[Konstantinidis, Konstantinos T., Alban Ramette, and James M. Tiedje. 2006\. “The Bacterial Species Definition in the Genomic Era.” *Philosophical Transactions of the Royal Society of London. Series B, Biological Sciences* 361 (1475): 1929–40.](http://paperpile.com/b/iJBGNj/exIX)
[Krebs, Hans Adolf, and William Arthur Johnson. 1937\. “The Role of Citric Acid in Intermediate Metabolism in Animal Tissues.” *Enzymologia* 4 (1): 148–56.](http://paperpile.com/b/iJBGNj/z0z75)
[Lander, Eric S., L. M. Linton, B. Birren, C. Nusbaum, M. C. Zody, J. Baldwin, K. Devon, et al. 2001\. “Initial Sequencing and Analysis of the Human Genome.” *Nature* 409 (6822): 860–921.](http://paperpile.com/b/iJBGNj/VTm8)
[Lanier, Kathryn A., Anton S. Petrov, and Loren Dean Williams. 2017\. “The Central Symbiosis of Molecular Biology: Molecules in Mutualism.” *Journal of Molecular Evolution* 85 (1-2): 8–13.](http://paperpile.com/b/iJBGNj/SRNH)
[Mandelbrot, Benoît. 1967\. “How Long Is the Coast of Britain? Statistical Self-Similarity and Fractional Dimension.” *Science* 156 (3775): 636–38.](http://paperpile.com/b/iJBGNj/Zfmef)
[———. 1989\. “Multifractal Measures, Especially for the Geophysicist.” In *Fractals in Geophysics*, 5–42. Basel: Birkhäuser Basel.](http://paperpile.com/b/iJBGNj/fCgz)
[McClintock, Barbara. 1950\. “The Origin and Behavior of Mutable Loci in Maize.” *Proceedings of the National Academy of Sciences* 36 (6): 344–55.](http://paperpile.com/b/iJBGNj/2aBSk)
[Michod, Richard E. 2000\. *Darwinian Dynamics: Evolutionary Transitions in Fitness and Individuality*. Princeton, NJ: Princeton University Press.](http://paperpile.com/b/iJBGNj/Lups)
[Mordvintsev, Alexander, Ettore Randazzo, Eyvind Niklasson, and Michael Levin. 2020\. “Growing Neural Cellular Automata.” *Distill* 5 (2): e23.](http://paperpile.com/b/iJBGNj/42tF)
[Murray, Connor S., Yingnan Gao, and Martin Wu. 2021\. “Re-Evaluating the Evidence for a Universal Genetic Boundary among Microbial Species.” *Nature Communications* 12 (1): 4059\.](http://paperpile.com/b/iJBGNj/EmaD)
[Nasir, Arshan, and Gustavo Caetano-Anollés. 2015\. “A Phylogenomic Data-Driven Exploration of Viral Origins and Evolution.” *Science Advances* 1 (8): e1500527.](http://paperpile.com/b/iJBGNj/Eybne)
[Naville, Magali, Ian A. Warren, Zofia Haftek-Terreau, Domitille S. Chalopin, Frédéric G. Brunet, Perrine Levin, Delphine Galiana, and Jean Nicholas Volff. 2016\. “Not so Bad after All: Retroviruses and Long Terminal Repeat Retrotransposons as a Source of New Genes in Vertebrates.” *Clinical Microbiology and Infection: The Official Publication of the European Society of Clinical Microbiology and Infectious Diseases* 22 (4): 312–23.](http://paperpile.com/b/iJBGNj/8oAok)
[Neumann, John von. 1945\. “First Draft of a Report on the EDVAC.” University of Pennsylvania. https://doi.org/](http://paperpile.com/b/iJBGNj/duT1R)[10.1109/85.238389](http://dx.doi.org/10.1109/85.238389) 
[Neumann, John von, and Arthur W. Burks. 1966\. *Theory of Self-Reproducing Automata*. Urbana and London: University of Illinois Press.](http://paperpile.com/b/iJBGNj/hRXHY)
[Pastuzyn, Elissa D., Cameron E. Day, Rachel B. Kearns, Madeleine Kyrke-Smith, Andrew V. Taibi, John McCormick, Nathan Yoder, et al. 2018\. “The Neuronal Gene Arc Encodes a Repurposed Retrotransposon Gag Protein That Mediates Intercellular RNA Transfer.” *Cell* 173 (1): 275\.](http://paperpile.com/b/iJBGNj/H4xh)
[Peretó, Juli, Jeffrey L. Bada, and Antonio Lazcano. 2009\. “Charles Darwin and the Origin of Life.” *Origins of Life and Evolution of the Biosphere: The Journal of the International Society for the Study of the Origin of Life* 39 (5): 395–406.](http://paperpile.com/b/iJBGNj/oW314)
[Pesavento, Umberto. 1995\. “An Implementation of von Neumann’s Self-Reproducing Machine.” *Artificial Life* 2 (4): 337–54.](http://paperpile.com/b/iJBGNj/UlMre)
[Prigogine, Ilya, and Isabelle Stengers. 1984\. *Order out of Chaos: Man’s New Dialogue with Nature*. London: William Heinemann.](http://paperpile.com/b/iJBGNj/AjJl)
[Pross, Addy. 2012\. *What Is Life?: How Chemistry Becomes Biology*. Oxford, UK: Oxford University Press.](http://paperpile.com/b/iJBGNj/iXQT3)
[Raup, David M., and Stephen Jay Gould. 1974\. “Stochastic Simulation and Evolution of Morphology-Towards a Nomothetic Paleontology.” *Systematic Biology* 23 (3): 305–22.](http://paperpile.com/b/iJBGNj/RdfDo)
[Ray, Thomas S. 1991\. “An Approach to the Synthesis of Life.” In *Artificial Life II, Santa Fe Institute Studies in the Sciences of Complexity, Vol. XI*, edited by C. Langton, C. Taylor, J. D. Farmer, and S. Rasmussen, 371–408. Redwood City, CA: Addison-Wesley.](http://paperpile.com/b/iJBGNj/5uHZ)
[Reichenbach, Hans. 1956\. *The Direction of Time*. Edited by Maria Reichenbach. Berkeley, CA: University of California Press.](http://paperpile.com/b/iJBGNj/9udzk)
[Robertson, Michael P., and Gerald F. Joyce. 2012\. “The Origins of the RNA World.” *Cold Spring Harbor Perspectives in Biology* 4 (5). https://doi.org/](http://paperpile.com/b/iJBGNj/GdGZv)[10.1101/cshperspect.a003608](http://dx.doi.org/10.1101/cshperspect.a003608)
[Rovelli, Carlo. 2018\. *The Order of Time*. Translated by Erica Segre and Simon Carnell. New York: Riverhead Books.](http://paperpile.com/b/iJBGNj/N9LOm)
[Russell, Michael J., and William Martin. 2004\. “The Rocky Roots of the Acetyl-CoA Pathway.” *Trends in Biochemical Sciences* 29 (7): 358–63.](http://paperpile.com/b/iJBGNj/1vX88)
[Russ, Eric, and Sergey Iordanskiy. 2023\. “Endogenous Retroviruses as Modulators of Innate Immunity.” *Pathogens* 12 (2). https://doi.org/](http://paperpile.com/b/iJBGNj/hMUQ)[10.3390/pathogens12020162](http://dx.doi.org/10.3390/pathogens12020162)
[Ryan, Frank. 2009\. *Virolution*. London: Collins.](http://paperpile.com/b/iJBGNj/cTbw9)
[Sagan, Lynn. 1967\. “On the Origin of Mitosing Cells.” *Journal of Theoretical Biology* 14 (3): 255–74.](http://paperpile.com/b/iJBGNj/ijKop)
[Schrödinger, Erwin. 1944\. *What Is Life? The Physical Aspect of the Living Cell*. Cambridge University Press.](http://paperpile.com/b/iJBGNj/asO1A)
[Shapiro, Robert. 2006\. “Small Molecule Interactions Were Central to the Origin of Life.” *The Quarterly Review of Biology* 81 (2): 105–25.](http://paperpile.com/b/iJBGNj/YRi9y)
[Sharp, Paul M., and Beatrice H. Hahn. 2011\. “Origins of HIV and the AIDS Pandemic.” *Cold Spring Harbor Perspectives in Medicine* 1 (1): a006841.](http://paperpile.com/b/iJBGNj/DLa7P)
[She, Jianqi, Minghao Du, Zhanzhan Xu, Yueqi Jin, Yu Li, Daoning Zhang, Changyu Tao, Jian Chen, Jiadong Wang, and Ence Yang. 2022\. “The Landscape of hervRNAs Transcribed from Human Endogenous Retroviruses across Human Body Sites.” *Genome Biology* 23 (1): 231\.](http://paperpile.com/b/iJBGNj/NsDjj)
[Smil, Vaclav. 2008\. *Energy in Nature and Society: General Energetics of Complex Systems*. London and Cambridge, MA: MIT Press.](http://paperpile.com/b/iJBGNj/SWlI)
[Szathmáry, Eörs, and John Maynard Smith. 1995\. “The Major Evolutionary Transitions.” *Nature* 374 (6519): 227–32.](http://paperpile.com/b/iJBGNj/yGSxJ)
[Taleb, Nassim Nicholas. 2014\. *Antifragile: Things That Gain from Disorder*. New York: Random House.](http://paperpile.com/b/iJBGNj/BTTV)
[Tarlinton, Rachael E., Joanne Meers, and Paul R. Young. 2006\. “Retroviral Invasion of the Koala Genome.” *Nature* 442 (7098): 79–81.](http://paperpile.com/b/iJBGNj/9fOiA)
[Thomas, Dylan. 1934\. *18 Poems by Dylan Thomas*. London: Fortune Press.](http://paperpile.com/b/iJBGNj/55Kf)
[Thomson, William. 1857\. “On a Universal Tendency in Nature to the Dissipation of Mechanical Energy.” *Proceedings of the Royal Society of Edinburgh* 3: 139–42.](http://paperpile.com/b/iJBGNj/JvJv)
[———. 1871\. “Inaugural Address before the British Association at Edinburgh, August 2d.” *American Journal of Science, and Arts* s3-2 (October): 269–94.](http://paperpile.com/b/iJBGNj/bcOGJ)
[Turing, Alan Mathison. 1937\. “On Computable Numbers, with an Application to the Entscheidungsproblem.” *Proceedings of the London Mathematical Society. Third Series* s2-42 (1): 230–65.](http://paperpile.com/b/iJBGNj/8saZ8)
[———. 1948\. “Intelligent Machinery: A Report.” *London: National Physical Laboratory*, 27\.](http://paperpile.com/b/iJBGNj/NmrxS)
[———. 1950\. “Computing Machinery and Intelligence.” *Mind; a Quarterly Review of Psychology and Philosophy* 59 (236): 433–60.](http://paperpile.com/b/iJBGNj/Jjk4i)
[———. 1952\. “The Chemical Basis of Morphogenesis.” *Bulletin of Mathematical Biology* 52 (1): 153–97.](http://paperpile.com/b/iJBGNj/QeZ1Q)
[———. (1951) 2000\. “Alan Turing’s Manual for the Ferranti Mk. I (transcribed by Robert S. Thau).” infoamerica.org. February 13, 2000\.](http://paperpile.com/b/iJBGNj/O6xpg) [https://www.infoamerica.org/documentos\_pdf/turing02.pdf](https://www.infoamerica.org/documentos_pdf/turing02.pdf) 
[Walker, Sara. 2023\. “AI Is Life.” *Noema Magazine*, April.](http://paperpile.com/b/iJBGNj/9hvK) [https://www.noemamag.com/ai-is-life/](https://www.noemamag.com/ai-is-life/)
[Watson, James D., and Francis H. Crick. 1953\. “Molecular Structure of Nucleic Acids; a Structure for Deoxyribose Nucleic Acid.” *Nature* 171 (4356): 737–38.](http://paperpile.com/b/iJBGNj/L7DKX)
[West, Geoffrey B. 2017\. *Scale: The Universal Laws of Life, Growth, and Death in Organisms, Cities, and Companies*. New York: Penguin.](http://paperpile.com/b/iJBGNj/BAqLl)
[West, Geoffrey B., James H. Brown, and Brian J. Enquist. 1997\. “A General Model for the Origin of Allometric Scaling Laws in Biology.” *Science* 276 (5309): 122–26.](http://paperpile.com/b/iJBGNj/pguCN)
[Woese, Carl R. 2002\. “On the Evolution of Cells.” *Proceedings of the National Academy of Sciences* 99 (13): 8742–47.](http://paperpile.com/b/iJBGNj/d9Qm1)
[Wolpert, David H., and William Macready. 2007\. “Using Self‐dissimilarity to Quantify Complexity.” *Complexity* 12 (3): 77–85.](http://paperpile.com/b/iJBGNj/Gz3o)
[Yinusa, Ayoola R., and Chrystopher L. Nehaniv. 2011\. “Study of Inheritable Mutations in von Neumann Self-Reproducing Automata Using the GOLLY Simulator.” In *2011 IEEE Symposium on Artificial Life (ALIFE)*, 211–17.](http://paperpile.com/b/iJBGNj/4vXpF)
[Yong, Ed. 2013\. “How a Quarter of the Cow Genome Came from Snakes.” *National Geographic*, January.](http://paperpile.com/b/iJBGNj/eZbeB) [https://www.nationalgeographic.com/science/article/how-a-quarter-of-the-cow-genome-came-from-snakes](https://www.nationalgeographic.com/science/article/how-a-quarter-of-the-cow-genome-came-from-snakes)

{% endchapter %}  

{% chapter 'image-credits'%}  
# Image credits

<div class="wrapper">

Every reasonable attempt has been made to locate copyright owners and ensure accuracy of crediting. Errors or omissions will be corrected in future editions.

**Jacket**: Figure 2 from Turing, A.M. “The Chemical Basis of Morphogenesis.” *Philosophical Transactions of the Royal Society of London. Series B, Biological Sciences* 237, no. 641 (1952): 37–72. Slightly edited by James Goggin, 2024; **Front and back covers:** © Blaise Agüera y Arcas, 2024; **Endpapers**: Painting associated with the rockhole and soakage water site of Marrapinti by Yalti Napangati, one of the “Pintupi Nine” from Australia’s Western Desert; collection of Margaret Levi and Bob Kaplan.

**Foreword** 7: © 2020 Raptis Rare Books.

**Abiogenesis** 10: Claude Duret, 1605; 12–13: MARUM—Zentrum für Marine Umweltwissenschaften, Universität Bremen; 14: Ivan Petrovich Vtorov, 2012; 16: Aaron Cavosie, John Valley Extracted and re-arranged by Gretarsson, 2014; 18: © Blaise Agüera y Arcas, Johan Michalove, James Goggin, 2024; 21: Guy Viner / Alamy Stock Photo.

**Symbiogenesis** 24: Robert M. Hunt, 1975; 27: John Gould, 1845; 29: Drawing by Eva Koch, reproduced with permission of Bjarne Grønnow.

**Reproductive functions** 34: Unknown photographer, 1939; 36: von Neumann, J. High Speed Computing. Undated, 1940s. American Philosophical Society Library, Philadelphia, PA, USA. Herman Heine Goldstine Papers, Box 49; 37, 38–39: Unless otherwise indicated, this information has been authored by an employee or employees of the Los Alamos National Security, LLC (LANS), operator of the Los Alamos National Laboratory under Contract No. DE-AC52-06NA25396 with the U.S. Department of Energy. The U.S. Government has rights to use, reproduce, and distribute this information. The public may copy and use this information without charge, provided that this Notice and any statement of authorship are reproduced on all copies. Neither the Government nor LANS makes any warranty, express or implied, or assumes any liability or responsibility for the use of this information; 40: Turing, A. M. “The Chemical Basis of Morphogenesis.” *Philosophical Transactions of the Royal Society of London. Series B, Biological Sciences* 237, no. 641 (1952): 37–72.

**Life as computation** 46: © 2024 Center for Molecular Biology of RNA; 48–49: University of Manchester School of Computer Science; 50: Turing, A.M. “Intelligent Machinery: A Report.” National Physical Laboratory (1948); 51: Neumann, John von and Arthur W. Burks. *Theory Of Self-Reproducing Automata.* (1967); 53: Original automaton: Renato Nobili and Umberto Pesavento, screenshot by Ferkel, 2008; 55: Mordvintsev et al. “Growing Neural Cellular Automata.” Distill (2020).

**Artificial life** 60–61, 63: © Blaise Agüera y Arcas, 2024; 65: © Alex Mordvintsev, 2024\. See also Arcas, Blaise Agüera y, Jyrki Alakuijala, James Evans, Ben Laurie, Alexander Mordvintsev, Eyvind Niklasson, E. Randazzo and Luca Versari. “Computational Life: How Well-formed, Self-replicating Programs Emerge from Simple Interaction.” *ArXiv* abs/2406.19108 (2024).

**Thermodynamics** 72: SuwanPhoto / iStock; 76–77: Black, Newton Henry, and Harvey N. Davis. 1913\. *Practical Physics for Secondary Schools; Fundamental Principles and Applications to Daily Life.* New York: The Macmillan Company.

**Complexification** 92–93: © Blaise Agüera y Arcas.

**Virality** 104: Serra, F. (2012). *Informational, ecological, and system approaches for complete genome analysis* (Doctoral dissertation, Universitat de València). Design by James Goggin; 106: Smithsonian Institution/Science Service; Restored by Adam Cuerden, 1947; 111: Ivancevic, A.M., Kortschak, R.D., Bertozzi, T. *et al*. Horizontal transfer of BovB and L1 retrotransposons in eukaryotes. *Genome Biol* 19, 85 (2018); Ivica Letunic, Peer Bork, Interactive Tree of Life (iTOL) v6: recent updates to the phylogenetic tree display and annotation tool, Nucleic Acids Research, Volume 52, Issue W1, 5 July 2024, Pages W78–W82, https://doi.org/10.1093/nar/gkae268; 113: Giovanni Battista Tebaldini, “Marine monster,” 1642,  Medical Historical Library, Harvey Cushing/John Hay Whitney Medical Library, Yale University.

**Compression** 118–119: Tveness, 2021 and Blaise Agüera y Arcas and Johan Michalove, 2024; 122: West, Geoffrey B., James H. Brown, and Brian J. Enquist. “A General Model for the Origin of Allometric Scaling Laws in Biology.” *Science* 276, no. 5309 (1997); 124–25: Mandelbrot, Benoît. “How Long Is the Coast of Britain? Statistical Self-Similarity and Fractional Dimension.” *Science* 156, no. 3775 (1967): 636–38. 

**Embodiment** 134: Lydekker (ed.), *The Royal Natural History*, 1893–1896; 135: Turner, F.R. and Mahowald, A.P. (1979). “Scanning electron microscopy of Drosophila melanogaster embryogenesis. III. Formation of the head and caudal segments.” *Dev. Biol.* 68: 96-109; 137: 1896 skiagraph of a *N. pompilius* by James Green & James H. Gardiner, from *Proceedings of the Malacological Society of London*, Vol. II, Pl. XV, p. 178\.

**Élan vital** 146: Nasher, https://w.wiki/BGzW (2013).

</div>
{% endchapter %}  
{% chapter 'note-one-the-artwork'%}  


# Note on the artwork

The front and back endpapers of this book feature details of an artwork by Yalti Napangati, born around 1970 in Australia’s Great Sandy Desert. She is one of the “Pintupi Nine,” a traditional family who remained unaware of European colonization until 1984, when they made contact with relatives near Kiwirkurra. This painting depicts designs associated with the rockhole and soakage water site of Marrapinti, west of Kiwirrkurra. During ancestral times a large group of women gathered at this site during their travels toward the east. While at the site the women made nose bones, also known as marrapinti, which are worn through a hole made in the nasal septum. These nose bones were originally used by both men and women but are now only inserted by the older generation on ceremonial occasions. Upon completion of the ceremonies at Marrapinti the women continued their travels east to Ngaminya and then onto Wilkinkarra (Lake Mackay). The shapes in the painting represent geographical features of the landscape and bush foods the women collected as they traveled.


{% endchapter %}  
{% chapter 'note-on-the-type'%}  

# Note on the type

This book, both print and web editions, is typeset in Exposure, a variable typeface designed between 2019 and 2022 by Federico Parra Barrios at the Atelier National de Recherche Typographique in Nancy, France. Variable fonts are an OpenType technology enabling parameters like weight, slant, and width to vary continuously. Instead of traditional type weight, Exposure uses the new technology to simulate an obsolete one, producing the eroded or blown-out effects of under- or over-exposure in phototypesetting.

{% endchapter %}  

[^1]:  [Thomson 1871](https://paperpile.com/c/iJBGNj/bcOGJ).

[^2]:  [Peretó, Bada, and Lazcano 2009](https://paperpile.com/c/iJBGNj/oW314).

[^3]:  [Robertson and Joyce 2012](https://paperpile.com/c/iJBGNj/GdGZv).

[^4]:  [Russell and Martin 2004; Shapiro 2006](https://paperpile.com/c/iJBGNj/1vX88+YRi9y).

[^5]:  Remember, from chemistry class, that since hydrogen (H) consists of a single proton bound to a single electron, a positively charged hydrogen ion with its electron stripped off (H\+) is just a proton. When proton concentration varies over space, the ensuing flow of ions generates an electric current.

[^6]:  [Krebs and Johnson 1937](https://paperpile.com/c/iJBGNj/z0z75). Krebs won the Nobel Prize in Medicine for this work in 1953\.

[^7]:  [Evans, Buchanan, and Arnon 1966](https://paperpile.com/c/iJBGNj/nCFk).

[^8]:  [Buchanan and Arnon 1990](https://paperpile.com/c/iJBGNj/tKw5R).

[^9]:  Today, a great majority of the organic fuel consumed by respiration in animals and fungi comes from plants, which fix carbon using photosynthesis instead of the more ancient reverse Krebs cycle.

[^10]:  [Szathmáry and Smith 1995](https://paperpile.com/c/iJBGNj/yGSxJ). The somewhat narrower term “evolutionary transitions in individuality” (ETI) is also increasingly used; [Michod 2000](https://paperpile.com/c/iJBGNj/Lups).

[^11]:  [Sagan 1967](https://paperpile.com/c/iJBGNj/ijKop).

[^12]:  [Woese 2002](https://paperpile.com/c/iJBGNj/d9Qm1). In this book, I’ll use the terms *symbiosis* and *symbiogenesis* in broader ways than most biologists do, to include cooperation and eventual interdependence among entities of all kinds—in the spirit of molecular biologists who have framed the origins of life as symbiosis among “molecules in mutualism,” per [Lanier, Petrov, and Williams 2017](https://paperpile.com/c/iJBGNj/SRNH).

[^13]:  [Konstantinidis, Ramette, and Tiedje 2006; Murray, Gao, and Wu 2021](https://paperpile.com/c/iJBGNj/exIX+EmaD).

[^14]:  [Raup and Gould 1974](https://paperpile.com/c/iJBGNj/RdfDo).

[^15]:  In some cases, like the car versus the horse and buggy, or photosynthesis versus the reverse Krebs cycle, a new technology crowds out an old one due to greater efficiency; however, even here, the crowding-out is often not total. There are still a few horses and buggies, and a few organisms using the reverse Krebs cycle.

[^16]:  [Turing 1950](https://paperpile.com/c/iJBGNj/Jjk4i).

[^17]:  [Turing 1937](https://paperpile.com/c/iJBGNj/8saZ8).

[^18]:  Technically, a Turing Machine, whether universal or not, must always be able to increase its tape size if needed, while real computers have fixed storage limits—but for most purposes, close enough.

[^19]:  [von Neumann 1945](https://paperpile.com/c/iJBGNj/duT1R).

[^20]:  Both died young, Turing in 1954, at age 41, and von Neumann in 1957, aged 53\.

[^21]:  [Turing 1952](https://paperpile.com/c/iJBGNj/QeZ1Q).

[^22]:  Many years later, German molecular biologist Christiane Nüsslein-Volhard identified the first real-life morphogen, the “Bicoid” protein, which forms a gradient along the fruit fly embryo to establish its segmented body plan. She won the Nobel Prize for this discovery, alongside Eric Wieschaus and Edward Lewis, in 1995\.

[^23]:  [von Neumann and Burks 1966](https://paperpile.com/c/iJBGNj/hRXHY).

[^24]:  In a more abstract form, mathematician Stephen Kleene had proven this result years earlier, a result known today as Kleene’s Second Recursion Theorem; [Kleene 1938](https://paperpile.com/c/iJBGNj/PD5o).

[^25]:  I’m using the term “complex” here in a colloquial sense; according to at least one technical definition (Kolmogorov complexity), if the instructions within the “simple” entity fully describe how to make the “more complex” one, they are actually of equal complexity.

[^26]:  [Watson and Crick 1953](https://paperpile.com/c/iJBGNj/L7DKX).

[^27]:  While reversible computing is known to be theoretically possible, and has attracted some renewed interest in recent years because of its relevance to quantum computing, it remains largely unexplored.

[^28]:  [Turing \[1951\] 2000](https://paperpile.com/c/iJBGNj/O6xpg).

[^29]:  [Turing 1948](https://paperpile.com/c/iJBGNj/NmrxS). Infants’ brains are of course not random. Turing was right to believe, though, that randomness plays a major role in their initial “wiring”; subsequent learning and development strengthens some connections, while pruning many others. 

[^30]:  [Pesavento 1995](https://paperpile.com/c/iJBGNj/UlMre).

[^31]:  [Mordvintsev et al. 2020](https://paperpile.com/c/iJBGNj/42tF).

[^32]:  [Agüera y Arcas et al. 2024](https://paperpile.com/c/iJBGNj/2mU4q). This work draws inspiration from classic work in ALife, especially [Barricelli 1957; Fontana 1990; Ray 1991; Adami and Brown 1994](https://paperpile.com/c/iJBGNj/cKjJ+KJwB+5uHZ+6Ou0).

[^33]:  Decrementing 0 wraps around to 255, the largest possible value for a byte, and incrementing 255 wraps around to 0\.

[^34]:  You might have noticed that the original Brainfuck had 8 instructions, including “.” for “print” and “,” for “input.” Bff uses only “,” because instead of reading and writing to an external terminal or console, the tape reads and writes to *itself*. Thus only a single instruction is needed for copying a byte from one location to another. In our first paper describing bff, we included instructions “{” and “}” for moving the console pointer, but a stripped-down alternative, used here, simply initializes the data and console pointers with the first two bytes on the tape.

[^35]:  [Schrödinger 1944](https://paperpile.com/c/iJBGNj/asO1A).

[^36]:  [H. Reichenbach 1956; Rovelli 2018](https://paperpile.com/c/iJBGNj/9udzk+N9LOm).

[^37]:  The “very nearly” qualifier arises from the deep mathematical structure of relativistic quantum mechanics. A number of near-symmetries in physics, such as between positive or negative charge, left or right-handedness, and time reversal, are not quite exact in quantum field theory, though according to the CPT theorem—the letters stand for charge, parity, time—reversing all three at once *does* yield an exact symmetry.

[^38]:  For the moment, I’m sidestepping a direct definition of the term *disorder* and its apparent subjectivity (is my desk disorderly or does it reflect an order only I can see?), but we will soon return to the central role of a *model* in distinguishing order from disorder; this is the link connecting thermodynamics to information theory.

[^39]:  The development of clocks and other complex machines in the Middle Ages set the scene, per [Prigogine and Stengers 1984](https://paperpile.com/c/iJBGNj/AjJl): “The clock world is a metaphor suggestive of God the Watchmaker, the rational master of a robot-like nature.” Newtonian dynamics reinforced the idea that the universe’s dynamics were deterministic and knowable, hence “robot-like.”

[^40]:  [Smil 2008](https://paperpile.com/c/iJBGNj/SWlI).

[^41]:  [Agüera y Arcas 2023](https://paperpile.com/c/iJBGNj/I1PA).

[^42]:  *PV*\=*nRT*, where *P* is pressure, *V* is volume, *T* is temperature, *n* is the number of gas molecules or billiard balls, and *R* is the “ideal gas constant.”

[^43]:  Kinetic energy is proportional to the mass and squared velocity of the molecules.

[^44]:  More precisely, these are repulsive interactions between the electron orbitals of the molecules.

[^45]:  [Thomson 1857](https://paperpile.com/c/iJBGNj/JvJv).

[^46]:  [Pross 2012](https://paperpile.com/c/iJBGNj/iXQT3).

[^47]:  [Taleb 2014](https://paperpile.com/c/iJBGNj/BTTV).

[^48]:  In the language of dynamical systems theory, this asserts that thermodynamic stability is a fixed point, while DKS is a limit cycle.

[^49]:  [Dawkins 1986](https://paperpile.com/c/iJBGNj/y5S44).

[^50]:  [Kauffman 1971](https://paperpile.com/c/iJBGNj/MqQWR).

[^51]:  In classical mythology, chimeras are “unnatural” combinations of animals—for instance, a fusion of lion, goat, and snake. As we’ll see, they aren’t so unnatural after all.

[^52]:  [Yinusa and Nehaniv 2011](https://paperpile.com/c/iJBGNj/4vXpF).

[^53]:  This is not an absolute rule, since new parts can also evolve within an existing whole.

[^54]:  [Lander et al. 2001](https://paperpile.com/c/iJBGNj/VTm8).

[^55]:  [Baltimore 1970](https://paperpile.com/c/iJBGNj/zwxh).

[^56]:  [McClintock 1950](https://paperpile.com/c/iJBGNj/2aBSk).

[^57]:  [Tarlinton, Meers, and Young 2006](https://paperpile.com/c/iJBGNj/9fOiA).

[^58]:  [She et al. 2022](https://paperpile.com/c/iJBGNj/NsDjj).

[^59]:  [Horita and Fukumoto 2023](https://paperpile.com/c/iJBGNj/9X3am).

[^60]:  [Chuong 2018; Bakoulis et al. 2022; Russ and Iordanskiy 2023](https://paperpile.com/c/iJBGNj/lnm7+AvEV+hMUQ). Knocking out the “Arc” retrotransposon, likely of viral origin, renders lab mice unable to form new long-term memories, per [Pastuzyn et al. 2018](https://paperpile.com/c/iJBGNj/H4xh).

[^61]:  [Ryan 2009](https://paperpile.com/c/iJBGNj/cTbw9).

[^62]:  [Sharp and Hahn 2011](https://paperpile.com/c/iJBGNj/DLa7P).

[^63]:  [Crosby 2003; Harper et al. 2008](https://paperpile.com/c/iJBGNj/kD8C+qISP).

[^64]:  [Feschotte and Gilbert 2012; Naville et al. 2016](https://paperpile.com/c/iJBGNj/DS1xJ+8oAok).

[^65]:  [Nasir and Caetano-Anollés 2015](https://paperpile.com/c/iJBGNj/Eybne).

[^66]:  [Yong 2013](https://paperpile.com/c/iJBGNj/eZbeB).

[^67]:  Unlike eukaryotes, prokaryotes (bacteria and archaea) have very low proportions of “junk DNA.” This is because copying and expressing DNA are energetically expensive, and prokaryotes are energy-constrained, limiting their maximum DNA length and imposing strong evolutionary pressure to rid themselves of any code that can’t pull its own weight. However, a prokaryote’s “core genome” is typically only 60–70% of the total, with the remainder varying widely among strains. (Hence two *E. coli* bacteria can be as different from each other as a human and a fruit fly\!) Horizontal gene transfer via transposons, viruses, or “plasmids” (exchangeable DNA loops), enables widespread copying of code snippets among bacteria, resulting in a complex tangle of reproducing bits of code conceptually similar to that described here for eukaryotes.

[^68]:  Though earlier, we similarly considered individual bff instructions as minimal or “atomic” replicating entities.

[^69]:  Mandelbrot rediscovered and generalized these findings in the 1960s; see [Mandelbrot 1967](https://paperpile.com/c/iJBGNj/Zfmef).

[^70]:  [West 2017](https://paperpile.com/c/iJBGNj/BAqLl).

[^71]:  For the mathematically inclined: power laws relating two variables *x* and *y* take the general form *y*\=*axb*.

[^72]:  [West, Brown, and Enquist 1997](https://paperpile.com/c/iJBGNj/pguCN).

[^73]:  Incidentally, De Morgan was also computing pioneer Ada Lovelace’s math tutor. Charles Babbage conceived the Analytical Engine, a steampunk computer that, had it been built, would have predated the ENIAC by a century; Lovelace wrote presciently about the power of general-purpose computing—and arguably wrote the first computer program—in 1843\.

[^74]:  [De Morgan and De Morgan 1872](https://paperpile.com/c/iJBGNj/2F9YB).

[^75]:  [Wolpert and Macready 2007; Bagrov et al. 2020](https://paperpile.com/c/iJBGNj/Gz3o+sdOr).

[^76]:  This makes sense, since the underlying processes that shape coastlines differ between scales of, say, a meter, versus a kilometer; see [Mandelbrot 1989](https://paperpile.com/c/iJBGNj/fCgz).

[^77]:  These particular numbers correspond to the smoothest, *N*\=5, and roughest, *N*\=8, of Mandelbrot’s coastline diagrams in his classic 1967 paper, “How Long Is the Coast of Britain?”

[^78]:  If I were a fancier writer and used fewer stock phrases, the book wouldn’t ZIP so efficiently. Using the same compression algorithm, James Joyce’s *Ulysses* can only be squeezed down to 40% of its raw size\!

[^79]:  In math: for a random string of symbols that can assume *K* values, a string of length *L* would occur with frequency *f*\=*K*−*L*, while with replication occurring at all scales, string frequency scales like *f*\~*L*−*b*.

[^80]:  [Christley et al. 2009](https://paperpile.com/c/iJBGNj/Ph38o).

[^81]:  Recursion can’t be implemented by the ribosome on its own; I’ve used a bit of poetic license in identifying the ribosome with machine A. In reality, as morphogenesis illustrates, biological computation is more holistic and distributed.

[^82]:  [Carroll, Grenier, and Weatherbee 2013](https://paperpile.com/c/iJBGNj/SRYzg).

[^83]:  [Walker 2023](https://paperpile.com/c/iJBGNj/9hvK).

[^84]:  Computer viruses are a notable exception.

[^85]:  [Bennett 2010](https://paperpile.com/c/iJBGNj/jZ9KK).

[^86]:  [Kimmerer 2013](https://paperpile.com/c/iJBGNj/l1qj).

[^87]:  [Schrödinger 1944](https://paperpile.com/c/iJBGNj/asO1A).

[^88]:  [Thomas 1934](https://paperpile.com/c/iJBGNj/55Kf).



