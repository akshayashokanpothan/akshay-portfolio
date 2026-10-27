-- Seed Data for Connection Jobs
-- Inserts the four confirmed job records into public.jobs table.

INSERT INTO public.jobs (
  slug,
  title,
  specialization,
  domain,
  team,
  experience_min,
  experience_max,
  experience_label,
  location,
  work_mode,
  employment_type,
  closes_at,
  status,
  application_url,
  clarification_url,
  contact_email,
  summary,
  description,
  responsibilities,
  requirements,
  preferred_qualifications,
  why_join,
  hiring_process,
  application_instructions
) VALUES 
(
  'product-designer-ux',
  'Product Designer',
  'UX-first designer',
  'FinTech B2B',
  'Product Design',
  2,
  3,
  '2–3 years',
  'Bangalore',
  'Remote',
  'Full-time',
  '2026-10-29',
  'Published',
  'https://tally.so/r/2EqzVg',
  NULL,
  'akshayashokan248@gmail.com',
  'Build an AI-First B2B Fintech Product from 0 to 1. An early-stage B2B fintech startup founded by AI engineers is looking for a passionate UX-first product designer to shape an AI-first product experience from the ground up.',
  'We''re looking for someone who thinks beyond screens, cares about real user problems, and wants to take ownership of the product experience. You''ll work directly with the founders, collaborate with business stakeholders, and get opportunities to validate your design decisions with real users from week one.',
  '[
    {"category": "User Research & Discovery", "items": ["Conduct user interviews, usability testing, and exploratory research to understand business users and their workflows.", "Identify pain points, unmet needs, and opportunities to improve existing experiences.", "Translate research findings into clear problem statements, user journeys, and design opportunities.", "Validate assumptions with real users and iterate based on feedback."]},
    {"category": "End-to-End Product Design", "items": ["Own the design process from discovery and ideation through wireframing, prototyping, UI design, testing, and developer handoff.", "Design intuitive workflows for complex B2B and fintech use cases.", "Conduct UX audits and identify opportunities to improve usability, accessibility, and consistency.", "Build interactive prototypes to communicate and validate ideas.", "Consider edge cases, system states, error handling, and responsive behaviour."]},
    {"category": "AI-First Product Experiences", "items": ["Explore how AI workflows, LLMs, and intelligent automation can solve real business problems.", "Design experiences that make AI capabilities understandable, useful, and trustworthy.", "Account for uncertainty, incorrect outputs, user control, and recovery scenarios.", "Experiment with AI-assisted research, prototyping, and design workflows."]},
    {"category": "Ownership & Collaboration", "items": ["Work directly with the founders, who are AI engineers and technology professionals.", "Collaborate with business stakeholders to understand operational challenges and translate them into meaningful product experiences.", "Take ownership of design decisions and communicate the reasoning behind them.", "Help establish and evolve the product''s design system, reusable components, and design standards.", "Work closely with engineering teams to ensure design intent is reflected in implementation."]}
  ]'::jsonb,
  '[
    "2–3 years of experience in product design or UX/UI design.",
    "Strong foundations in user research, interaction design, information architecture, and visual design.",
    "Experience taking projects or features from discovery to delivery.",
    "Ability to work with ambiguity and structure loosely defined problems.",
    "Strong communication skills and the ability to explain design decisions.",
    "Comfort receiving critique, challenging assumptions, and iterating based on evidence.",
    "A portfolio demonstrating your process, reasoning, and individual contribution."
  ]'::jsonb,
  '["Experience with AI-first workflows, AI-powered products, fintech, financial services, or complex B2B applications."]'::jsonb,
  '[
    "Direct collaboration with AI engineers: Work closely with the founders and understand how AI capabilities translate into useful product experiences.",
    "Real ownership: Take responsibility for design decisions and contribute to the product''s design direction rather than simply executing predefined screens.",
    "Research from week one: Engage with business stakeholders and real users to understand problems, test assumptions, and validate solutions.",
    "Build from 0 to 1: Help shape the product, design system, and user experience as the startup evolves.",
    "A small, collaborative team: Your contribution will have a direct influence on the product and its users."
  ]'::jsonb,
  '[
    {"round": "Round 1 — Discovery & Portfolio", "detail": "A discussion about your projects, design decisions, user research, individual contribution, and outcomes."},
    {"round": "Round 2 — Design Process & Whiteboarding", "detail": "Collaborative exercises to understand how you approach ambiguous problems, structure solutions, and think through user experiences."},
    {"round": "Round 3 — HR & Founder Discussion", "detail": "A conversation about the role, expectations, collaboration, and mutual fit."}
  ]'::jsonb,
  'Complete the application form and share your portfolio, relevant case studies, and examples of your work. We''re interested in how you think, how you approach problems, and how you learn—not just how polished your final screens look.'
),
(
  'product-designer-ui',
  'Product Designer',
  'UI-first designer',
  'FinTech B2B',
  'Product Design',
  2,
  3,
  '2–3 years',
  'Bangalore',
  'Remote',
  'Full-time',
  '2026-10-31',
  'Published',
  'https://tally.so/r/2EqzVg',
  NULL,
  'akshayashokan248@gmail.com',
  'Build an AI-First B2B Fintech Product from 0 to 1 with an emphasis on visual hierarchy, interface craft, and design systems. An early-stage B2B fintech startup founded by AI engineers is looking for a UI-first product designer to shape an AI-first product experience from the ground up.',
  'We''re looking for someone who excels at UI craft, visual hierarchy, interface design, component consistency, and developer handoff. You''ll work directly with the founders and engineering team to turn complex fintech and AI workflows into elegant, intuitive, and polished interfaces.',
  '[
    {"category": "Interface Design & UI Craft", "items": ["Own high-fidelity interface design, visual hierarchy, typography, color palettes, and component consistency across complex B2B fintech workflows.", "Design intuitive, pixel-perfect layouts, responsive views, and multi-state interfaces for web and mobile platforms.", "Build interactive prototypes and micro-interactions to communicate and validate design details.", "Consider edge cases, system states, loading behaviors, error handling, and responsive behaviour."]},
    {"category": "Design Systems & Component Architecture", "items": ["Help establish, scale, and evolve the product''s design system, reusable Figma component libraries, and design tokens.", "Conduct UX/UI audits to identify inconsistencies and improve usability, accessibility, and visual harmony.", "Work closely with frontend engineering teams to ensure design tokens and component specs are accurately reflected in production code."]},
    {"category": "AI-First Product Experiences", "items": ["Design intuitive interfaces for AI workflows, LLM interactions, intelligent automation, and data visualization.", "Make AI capabilities understandable, useful, and trustworthy through transparent UI states and feedback loops.", "Account for uncertainty, incorrect outputs, user control, and recovery scenarios in the interface."]},
    {"category": "Ownership & Collaboration", "items": ["Work directly with the founders, who are AI engineers and technology professionals.", "Collaborate with UX researchers, product peers, and engineering teams to translate requirements into polished screens.", "Take ownership of visual design decisions and articulate the reasoning behind interface choices."]}
  ]'::jsonb,
  '[
    "2–3 years of experience in product design, UI design, or UX/UI design.",
    "Strong mastery of visual design fundamentals, typography, layout, color systems, and visual hierarchy.",
    "Deep expertise in Figma, including auto layout, components, variants, component properties, and design tokens.",
    "Experience taking UI projects from concept to final developer handoff and production QA.",
    "Strong communication skills and the ability to explain UI decisions and design trade-offs.",
    "Comfort receiving critique, challenging assumptions, and iterating based on feedback.",
    "A portfolio demonstrating exceptional UI craft, visual polish, and design system thinking."
  ]'::jsonb,
  '[
    "Experience with AI-first workflows, AI-powered products, fintech, financial services, or complex B2B applications.",
    "Familiarity with web technologies (HTML/CSS), design tokens, and frontend component libraries."
  ]'::jsonb,
  '[
    "Direct collaboration with AI engineers: Work closely with the founders and understand how AI capabilities translate into useful product experiences.",
    "Real ownership: Take responsibility for design decisions and contribute to the product''s design direction rather than simply executing predefined screens.",
    "Research from week one: Engage with business stakeholders and real users to understand problems, test assumptions, and validate solutions.",
    "Build from 0 to 1: Help shape the product, design system, and user experience as the startup evolves.",
    "A small, collaborative team: Your contribution will have a direct influence on the product and its users."
  ]'::jsonb,
  '[
    {"round": "Round 1 — Discovery & Portfolio", "detail": "A discussion about your projects, visual design craft, design decisions, and individual contribution."},
    {"round": "Round 2 — Design Process & Whiteboarding", "detail": "Collaborative exercises to understand how you approach ambiguous problems, structure solutions, and think through user interfaces."},
    {"round": "Round 3 — HR & Founder Discussion", "detail": "A conversation about the role, expectations, collaboration, and mutual fit."}
  ]'::jsonb,
  'Complete the application form and share your portfolio, relevant case studies, and examples of your work. We''re interested in how you think, how you craft interfaces, and how you solve problems.'
),
(
  'product-design-intern',
  'Product Design Intern',
  'Design Systems',
  'FinTech B2B',
  'Product Design',
  0,
  1,
  'Internship / Entry-level',
  'Bangalore',
  'Remote',
  'Internship',
  '2026-10-31',
  'Published',
  'https://tally.so/r/2EqzVg',
  NULL,
  'akshayashokan248@gmail.com',
  'Build an AI-First B2B Fintech Product from 0 to 1 as a Product Design Intern focused on Design Systems & UI Foundations. Work directly with founders and product designers to establish design foundations and UI consistency.',
  'We''re hiring a Product Design Intern to help build and maintain our product''s design system from the ground up. You will create reusable Figma components, work with design tokens, conduct UI audits, and explore AI-assisted design workflows in an early-stage B2B fintech environment.',
  '[
    {"category": "Design Systems & UI Foundations", "items": ["Help build and maintain the product''s design system from the ground up.", "Create and organise reusable Figma components, variants, and component properties.", "Work with design tokens, semantic variables, typography, colour, spacing, and other design foundations.", "Improve UI consistency across product screens and workflows.", "Document component usage, patterns, and design guidelines."]},
    {"category": "Product Design & Quality", "items": ["Audit existing interfaces to identify inconsistencies and opportunities for standardisation.", "Support the creation of responsive, accessible, and consistent user interfaces.", "Collaborate with the product designer to ensure the design system supports real user needs.", "Assist with prototypes, design reviews, and developer handoff."]},
    {"category": "AI-Assisted Design Workflows", "items": ["Explore AI tools that can support design exploration, documentation, and prototyping.", "Experiment with ways to make repetitive design tasks more efficient.", "Learn how design systems support scalable product development."]}
  ]'::jsonb,
  '[
    "A strong interest in product design, UI systems, and design consistency.",
    "Familiarity with Figma, auto layout, components, and variants.",
    "An understanding of design tokens, variables, and reusable design patterns.",
    "Good visual design fundamentals and attention to detail.",
    "A systematic approach to solving problems.",
    "Willingness to learn, accept feedback, and collaborate with designers and engineers."
  ]'::jsonb,
  '[
    "Experience creating a component library, UI kit, or personal design system.",
    "Familiarity with semantic tokens, accessibility, and AI-assisted design tools."
  ]'::jsonb,
  '[
    "Direct collaboration with AI engineers: Work closely with the founders and understand how AI capabilities translate into useful product experiences.",
    "Real ownership: Take responsibility for design decisions and contribute to the product''s design direction rather than simply executing predefined screens.",
    "Research from week one: Engage with business stakeholders and real users to understand problems, test assumptions, and validate solutions.",
    "Build from 0 to 1: Help shape the product, design system, and user experience as the startup evolves.",
    "A small, collaborative team: Your contribution will have a direct influence on the product and its users."
  ]'::jsonb,
  '[
    {"round": "Round 1 — Discovery & Portfolio", "detail": "A discussion about your projects, design decisions, and examples of your work."},
    {"round": "Round 2 — Design Process & Practical Exercise", "detail": "Collaborative exercises to understand how you approach component structuring and UI consistency."},
    {"round": "Round 3 — HR & Founder Discussion", "detail": "A conversation about the internship, learning goals, collaboration, and mutual fit."}
  ]'::jsonb,
  'Complete the application form and share your portfolio or examples of work demonstrating component libraries, UI designs, or Figma systems.'
),
(
  'creative-motion-graphics-designer',
  'Creative & Motion Graphics Designer',
  NULL,
  NULL,
  'Marketing & Experience Design',
  0,
  2,
  '0–2 years',
  'Kochi, Kerala',
  'Hybrid',
  'Full-time',
  '2026-10-29',
  'Published',
  'https://tally.so/r/2jjrvD',
  NULL,
  NULL,
  'Join a collaborative creative team creating compelling visual content across branding, social media, motion graphics, short-form video, and digital campaigns with AI-assisted creative workflows.',
  'We are looking for a creative and detail-oriented Creative Designer – Motion & Media to join our team in Kochi. The role involves creating compelling visual content across branding, social media, motion graphics, short-form video, and digital campaigns, incorporating AI-assisted creative tools for ideation, visual generation, and content development. Freshers with a strong portfolio and relevant design skills are encouraged to apply.',
  '[
    {"category": "Branding & Visual Identity", "items": ["Develop distinctive brand identities, including logos, color palettes, typography systems, and supporting visual elements.", "Create and maintain brand guidelines to ensure consistent visual communication.", "Translate brand positioning and personality into effective visual identities.", "Maintain consistency across social media, digital campaigns, and other brand touchpoints."]},
    {"category": "Social Media & Digital Design", "items": ["Design engaging Instagram carousels, static posts, stories, templates, infographics, and campaign creatives.", "Develop platform-specific creatives while maintaining each brand''s visual identity.", "Adapt creative concepts into multiple sizes and formats for different digital platforms.", "Stay updated with current social media design trends, formats, and visual best practices."]},
    {"category": "Motion Graphics & Short-Form Video", "items": ["Create and edit 15–60 second videos for Reels, Stories, advertisements, and other digital content.", "Work with Adobe After Effects, Adobe Premiere Pro, and DaVinci Resolve for video editing, motion graphics, and post-production.", "Incorporate transitions, typography animation, motion elements, visual effects, and color correction to enhance storytelling.", "Convert static concepts and designs into engaging motion content.", "Prepare platform-ready videos while maintaining visual and technical quality."]},
    {"category": "Concept Development & Storyboarding", "items": ["Collaborate with project managers and team members to brainstorm creative concepts for campaigns and content.", "Translate ideas into visual directions, mood boards, references, and storyboards.", "Contribute original ideas for social media campaigns, brand communication, and moment-marketing content.", "Understand creative briefs and develop visuals that effectively communicate the intended message."]},
    {"category": "AI-Assisted Creative Work", "items": ["Use AI tools such as ChatGPT and Midjourney to support creative ideation, prompt development, and visual production.", "Write effective prompts for generating and refining creative concepts and visual assets.", "Source and refine suitable visual assets from platforms such as Freepik and Pexels.", "Integrate AI-generated assets into designs while maintaining quality and brand consistency.", "Explore emerging AI and creative technologies that can improve the design workflow."]},
    {"category": "Asset Management & Delivery", "items": ["Maintain organized project folders, source files, creative assets, and version history.", "Follow proper file naming and version-control practices.", "Prepare final assets in appropriate dimensions, resolutions, and formats, including JPEG, PNG, and MP4.", "Ensure all deliverables meet platform specifications and quality standards before submission."]},
    {"category": "Feedback & Revisions", "items": ["Understand and implement client and internal feedback accurately.", "Handle design revisions efficiently while maintaining creative quality and consistency.", "Collaborate effectively with project managers and other team members.", "Manage multiple creative tasks and meet agreed project timelines."]}
  ]'::jsonb,
  '[
    "0–1 year of experience in graphic design, branding, social media design, motion graphics, video editing, or a related creative role (freshers with a strong portfolio may also apply).",
    "Proficiency in Adobe Photoshop and Adobe Illustrator.",
    "Working knowledge of Adobe After Effects, Adobe Premiere Pro, and DaVinci Resolve.",
    "Strong understanding of branding, logo design, typography, color theory, composition, and visual hierarchy.",
    "Good understanding of motion graphics and short-form video editing.",
    "Familiarity with Instagram posts, carousels, Stories, Reels, and other digital content formats.",
    "Familiarity with AI and creative tools such as ChatGPT, Midjourney, and Freepik.",
    "Strong creative thinking and visual storytelling abilities.",
    "Ability to understand creative briefs and translate them into effective visual outputs.",
    "Good organizational, file-management, and multitasking skills.",
    "Strong attention to detail and ability to work within deadlines.",
    "Clear communication skills and openness to feedback."
  ]'::jsonb,
  '[]'::jsonb,
  '[
    "Work on diverse projects – Gain hands-on experience across branding, social media, motion graphics, video, and digital campaigns.",
    "Build a stronger portfolio – Work on real projects for different brands and industries.",
    "Learn beyond static design – Develop your skills in motion, video editing, storytelling, and AI-assisted creative workflows.",
    "Turn ideas into actual campaigns – Participate in brainstorming, concept development, execution, and final delivery.",
    "Explore new creative technology – Experiment with AI tools and emerging design workflows alongside traditional design software.",
    "Grow with the team – Take on more creative responsibility as your skills and experience develop.",
    "Your ideas matter – We encourage designers to contribute concepts rather than simply execute assigned designs."
  ]'::jsonb,
  '[]'::jsonb,
  'Complete the application form and share your portfolio or links to your work in motion, branding, or social campaigns.'
)
ON CONFLICT (slug) DO NOTHING;
