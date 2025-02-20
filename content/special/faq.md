---
title: FAQ
description: Frequently Asked Questions (FAQ)

faq_active: 
 q: Who is Adam DJ Brett?
 a: Adam DJ Brett is a super hero scholar, educator, and digital humanist. He is currently a Postdoctoral Fellow in Digital Humanities at Hamilton College. His research focuses on religion, technology, and culture with particular interests in digital religion, artificial intelligence, and critical code studies.
faq: 
 - sort: 1
   q: "What are Adam's main research interests?"
   a: |
      Adam Dj Brett [primary research](https://example.com/research) interests include:
      - Digital religion
      - Artificial intelligence and ethics
      - Critical code studies
      - Digital humanities methodologies
      - American religious history American religious history"
 - sort: 2
   q: "What is Adam's educational background?"
   a: "Adam holds a Ph.D. in Religion <a href=\"https://example.com\">from Syracuse University</a>. He also has degrees in Religious Studies and Philosophy from the University of Waterloo"
 - sort: 3
   q: "Where can I find Adam's publications?"
   a: "You can find a list of Adam's publications on the Publications page of this website. This includes journal articles, book chapters, and digital projects."
 - sort: 4
   q: "Does Adam teach any courses?"
   a: "Yes, Adam teaches courses related to digital humanities, religion, and technology. You can find information about his current and past courses on the Teaching page. - https://adamdjbrett.com/teaching/"
 - sort: 5
   q: "Is Adam available for speaking engagements or consulting?"
   a: "Adam is open to speaking engagements and consulting opportunities related to his areas of expertise. Please use the Contact form to inquire about availability and topics."
 - sort: 6
   q: "What digital projects is Adam involved with?"
   a: "Adam is involved in several digital humanities projects, including The American Religious Sounds Project, Mapping Religious Diversity in the US, Critical Code Studies Working Group, You can find more details about these projects on the Projects page."
 - sort: 7
   q: "How can I learn more about Adam's work in digital humanities?"
   a: "The Digital Humanities section of this website provides an overview of Adam's approach to DH and links to relevant projects and publications."

permalink: /faq/
---
<div class="accordion" id="accordionFAQ">
<div class="accordion-item">
<h2 class="accordion-header">
<button class="accordion-button btn-cta" type="button" data-bs-toggle="collapse" aria-label="answer" data-bs-target="#collapseFAQ" aria-expanded="true" aria-controls="collapseOne">
{{faq_active.q}}
</button>
</h2>
<div id="collapseFAQ" class="accordion-collapse collapse show" aria-label="question" data-bs-parent="#accordionFAQ">
<div class="accordion-body">
{{faq_active.a}}
</div>
</div>
</div>
{% for fa in faq %}
<div class="accordion-item">
<h2 class="accordion-header">
<button class="accordion-button collapsed btn-cta" type="button" aria-label="answer" data-bs-toggle="collapse" data-bs-target="#collapse{{fa.sort}}" aria-expanded="false" aria-controls="collapse{{fa.sort}}">
{{fa.q}}
</button>
</h2>
<div id="collapse{{fa.sort}}" class="accordion-collapse collapse" aria-label="question" data-bs-parent="#accordion{{fa.sort}}">
<div class="accordion-body">
{{fa.a| md | safe}}
</div>
</div>
</div>
{% endfor %}
</div>
