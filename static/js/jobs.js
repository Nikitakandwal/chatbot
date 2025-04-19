$(document).ready(function() {
    // Expanded dummy job data
    const jobs = [
        // Software Development (15 jobs)
        {
            id: 1,
            title: "Software Developer",
            company: "Google",
            domain: "Software Development",
            workType: "Remote",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Develop and maintain scalable web applications using modern frameworks.",
            applyLink: "https://careers.google.com/",
            skills: ["Python", "JavaScript", "React", "Node.js"]
        },
        {
            id: 5,
            title: "Frontend Developer",
            company: "Apple",
            domain: "Software Development",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Build responsive and user-friendly interfaces for iOS applications.",
            applyLink: "https://www.apple.com/careers/",
            skills: ["React", "TypeScript", "CSS", "HTML"]
        },
        {
            id: 6,
            title: "Backend Engineer",
            company: "Netflix",
            domain: "Software Development",
            workType: "Remote",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Design and optimize server-side systems for streaming services.",
            applyLink: "https://jobs.netflix.com/",
            skills: ["Java", "Spring Boot", "AWS", "PostgreSQL"]
        },
        {
            id: 10,
            title: "Full Stack Developer",
            company: "Atlassian",
            domain: "Software Development",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Build and maintain collaboration tools like Jira and Confluence.",
            applyLink: "https://www.atlassian.com/company/careers",
            skills: ["JavaScript", "React", "Java", "MySQL"]
        },
        {
            id: 14,
            title: "Mobile App Developer",
            company: "Uber",
            domain: "Software Development",
            workType: "Onsite",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Develop and maintain mobile apps for ride-sharing services.",
            applyLink: "https://www.uber.com/careers/",
            skills: ["Swift", "Kotlin", "React Native", "API Integration"]
        },
        {
            id: 16,
            title: "Cloud Engineer",
            company: "AWS",
            domain: "Software Development",
            workType: "Remote",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Design and deploy scalable cloud infrastructure for enterprise clients.",
            applyLink: "https://aws.amazon.com/careers/",
            skills: ["AWS", "Docker", "Kubernetes", "Terraform"]
        },
        {
            id: 17,
            title: "DevOps Engineer",
            company: "GitHub",
            domain: "Software Development",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Automate CI/CD pipelines and manage infrastructure as code.",
            applyLink: "https://github.careers/",
            skills: ["Jenkins", "Ansible", "Git", "Linux"]
        },
        {
            id: 18,
            title: "Software Engineer",
            company: "Stripe",
            domain: "Software Development",
            workType: "Remote",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Build payment processing systems with high reliability.",
            applyLink: "https://stripe.com/jobs",
            skills: ["Ruby", "Python", "PostgreSQL", "API Design"]
        },
        {
            id: 19,
            title: "UI/UX Developer",
            company: "Airbnb",
            domain: "Software Development",
            workType: "Hybrid",
            ctc: "10-20",
            profile: "Entry Level",
            experience: "0-2 years",
            description: "Create intuitive user interfaces for travel booking platforms.",
            applyLink: "https://careers.airbnb.com/",
            skills: ["Figma", "JavaScript", "CSS", "React"]
        },
        {
            id: 20,
            title: "Embedded Systems Engineer",
            company: "Intel",
            domain: "Software Development",
            workType: "Onsite",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Develop firmware for next-generation processors.",
            applyLink: "https://jobs.intel.com/",
            skills: ["C", "C++", "RTOS", "Embedded Systems"]
        },
        {
            id: 21,
            title: "Blockchain Developer",
            company: "Coinbase",
            domain: "Software Development",
            workType: "Remote",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Build secure decentralized applications for cryptocurrency platforms.",
            applyLink: "https://www.coinbase.com/careers",
            skills: ["Solidity", "Ethereum", "JavaScript", "Security"]
        },
        {
            id: 22,
            title: "Game Developer",
            company: "Epic Games",
            domain: "Software Development",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Create immersive gaming experiences using Unreal Engine.",
            applyLink: "https://www.epicgames.com/careers",
            skills: ["C++", "Unreal Engine", "3D Modeling", "Game Design"]
        },
        {
            id: 23,
            title: "Database Engineer",
            company: "Oracle",
            domain: "Software Development",
            workType: "Onsite",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Optimize and manage large-scale database systems.",
            applyLink: "https://www.oracle.com/careers/",
            skills: ["SQL", "PL/SQL", "Oracle DB", "Performance Tuning"]
        },
        {
            id: 24,
            title: "Security Engineer",
            company: "Palo Alto Networks",
            domain: "Software Development",
            workType: "Remote",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Develop security solutions to protect enterprise networks.",
            applyLink: "https://www.paloaltonetworks.com/company/careers",
            skills: ["Cybersecurity", "Python", "Network Security", "Penetration Testing"]
        },
        {
            id: 25,
            title: "AR/VR Developer",
            company: "Meta",
            domain: "Software Development",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Build augmented and virtual reality applications for the metaverse.",
            applyLink: "https://www.metacareers.com/",
            skills: ["Unity", "C#", "VR Development", "3D Graphics"]
        },
        // Data Science (9 jobs)
        {
            id: 2,
            title: "Data Scientist",
            company: "Microsoft",
            domain: "Data Science",
            workType: "Hybrid",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Analyze large datasets to derive actionable insights using ML models.",
            applyLink: "https://careers.microsoft.com/",
            skills: ["Python", "R", "TensorFlow", "SQL"]
        },
        {
            id: 7,
            title: "Machine Learning Engineer",
            company: "Tesla",
            domain: "Data Science",
            workType: "Onsite",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Develop AI models for autonomous driving systems.",
            applyLink: "https://www.tesla.com/careers",
            skills: ["Python", "PyTorch", "Computer Vision", "Deep Learning"]
        },
        {
            id: 12,
            title: "AI Research Scientist",
            company: "OpenAI",
            domain: "Data Science",
            workType: "Hybrid",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Research and develop advanced AI models for natural language processing.",
            applyLink: "https://openai.com/careers/",
            skills: ["Python", "NLP", "Transformers", "Research"]
        },
        {
            id: 26,
            title: "Data Analyst",
            company: "Tableau",
            domain: "Data Science",
            workType: "Remote",
            ctc: "10-20",
            profile: "Entry Level",
            experience: "0-2 years",
            description: "Create dashboards and visualizations to support business decisions.",
            applyLink: "https://www.tableau.com/about/careers",
            skills: ["Tableau", "SQL", "Python", "Data Visualization"]
        },
        {
            id: 27,
            title: "Computer Vision Engineer",
            company: "NVIDIA",
            domain: "Data Science",
            workType: "Onsite",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Develop vision algorithms for AI-powered hardware.",
            applyLink: "https://www.nvidia.com/en-us/about-nvidia/careers/",
            skills: ["Python", "OpenCV", "Deep Learning", "CUDA"]
        },
        {
            id: 28,
            title: "Quantitative Analyst",
            company: "Goldman Sachs",
            domain: "Data Science",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Build models for financial risk assessment and trading strategies.",
            applyLink: "https://www.goldmansachs.com/careers/",
            skills: ["Python", "R", "Statistics", "Financial Modeling"]
        },
        {
            id: 29,
            title: "Data Engineer",
            company: "Snowflake",
            domain: "Data Science",
            workType: "Remote",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Design and maintain data pipelines for cloud-based analytics.",
            applyLink: "https://www.snowflake.com/en/careers/",
            skills: ["Python", "SQL", "ETL", "Snowflake"]
        },
        {
            id: 30,
            title: "NLP Engineer",
            company: "Hugging Face",
            domain: "Data Science",
            workType: "Remote",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Develop natural language processing models for open-source libraries.",
            applyLink: "https://huggingface.co/careers",
            skills: ["Python", "Transformers", "NLP", "PyTorch"]
        },
        {
            id: 31,
            title: "Business Intelligence Analyst",
            company: "Looker",
            domain: "Data Science",
            workType: "Hybrid",
            ctc: "10-20",
            profile: "Entry Level",
            experience: "0-2 years",
            description: "Analyze business data to provide actionable insights.",
            applyLink: "https://looker.com/careers",
            skills: ["SQL", "Looker", "Data Analysis", "Statistics"]
        },
        // Product Management (9 jobs)
        {
            id: 3,
            title: "Product Manager",
            company: "Amazon",
            domain: "Product Management",
            workType: "Onsite",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Lead product strategy and roadmap for e-commerce platform.",
            applyLink: "https://www.amazon.jobs/",
            skills: ["Product Strategy", "Agile", "Stakeholder Management"]
        },
        {
            id: 9,
            title: "Technical Program Manager",
            company: "Salesforce",
            domain: "Product Management",
            workType: "Remote",
            ctc: "20-30",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Oversee technical projects and cross-functional teams.",
            applyLink: "https://www.salesforce.com/company/careers/",
            skills: ["Project Management", "Scrum", "Cloud Computing"]
        },
        {
            id: 13,
            title: "Scrum Master",
            company: "Spotify",
            domain: "Product Management",
            workType: "Remote",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Facilitate agile processes for music streaming product teams.",
            applyLink: "https://www.spotifyjobs.com/",
            skills: ["Scrum", "Agile", "Jira", "Team Leadership"]
        },
        {
            id: 32,
            title: "Associate Product Manager",
            company: "Slack",
            domain: "Product Management",
            workType: "Hybrid",
            ctc: "10-20",
            profile: "Entry Level",
            experience: "0-2 years",
            description: "Support product development for team collaboration tools.",
            applyLink: "https://slack.com/careers",
            skills: ["Product Roadmapping", "User Research", "Agile"]
        },
        {
            id: 33,
            title: "Product Owner",
            company: "Jira",
            domain: "Product Management",
            workType: "Remote",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Define and prioritize features for project management software.",
            applyLink: "https://www.atlassian.com/company/careers",
            skills: ["Agile", "Jira", "Backlog Management", "Stakeholder Engagement"]
        },
        {
            id: 34,
            title: "Senior Product Manager",
            company: "Zoom",
            domain: "Product Management",
            workType: "Hybrid",
            ctc: "30+",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Drive product strategy for video conferencing solutions.",
            applyLink: "https://www.zoom.us/careers",
            skills: ["Product Strategy", "Market Analysis", "Leadership"]
        },
        {
            id: 35,
            title: "Program Manager",
            company: "Cisco",
            domain: "Product Management",
            workType: "Onsite",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Coordinate cross-functional teams for networking products.",
            applyLink: "https://jobs.cisco.com/",
            skills: ["Project Management", "Agile", "Networking"]
        },
        {
            id: 36,
            title: "Product Marketing Manager",
            company: "Dropbox",
            domain: "Product Management",
            workType: "Remote",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Develop go-to-market strategies for cloud storage solutions.",
            applyLink: "https://www.dropbox.com/jobs",
            skills: ["Market Research", "Product Launch", "Marketing"]
        },
        {
            id: 37,
            title: "Agile Coach",
            company: "Trello",
            domain: "Product Management",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Guide teams in adopting agile methodologies for project management.",
            applyLink: "https://www.atlassian.com/company/careers",
            skills: ["Agile", "Coaching", "Scrum", "Kanban"]
        },
        // Marketing (12 jobs)
        {
            id: 4,
            title: "Marketing Specialist",
            company: "Facebook",
            domain: "Marketing",
            workType: "Remote",
            ctc: "10-20",
            profile: "Entry Level",
            experience: "0-2 years",
            description: "Create and manage digital marketing campaigns across social platforms.",
            applyLink: "https://www.facebook.com/careers/",
            skills: ["Digital Marketing", "SEO", "Content Creation"]
        },
        {
            id: 8,
            title: "Content Marketing Manager",
            company: "HubSpot",
            domain: "Marketing",
            workType: "Hybrid",
            ctc: "10-20",
            profile: "Mid Level",
            experience: "2-4 years",
            description: "Create engaging content to drive inbound marketing strategies.",
            applyLink: "https://www.hubspot.com/careers",
            skills: ["Content Marketing", "SEO", "Blogging", "Analytics"]
        },
        {
            id: 11,
            title: "Digital Marketing Analyst",
            company: "Adobe",
            domain: "Marketing",
            workType: "Remote",
            ctc: "10-20",
            profile: "Entry Level",
            experience: "0-2 years",
            description: "Analyze campaign performance and optimize marketing strategies.",
            applyLink: "https://www.adobe.com/careers.html",
            skills: ["Google Analytics", "PPC", "Social Media Marketing"]
        },
        {
            id: 15,
            title: "Growth Marketing Lead",
            company: "Shopify",
            domain: "Marketing",
            workType: "Remote",
            ctc: "20-30",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Drive user acquisition and retention for e-commerce platform.",
            applyLink: "https://www.shopify.com/careers",
            skills: ["Growth Hacking", "A/B Testing", "CRM", "Analytics"]
        },
        {
            id: 38,
            title: "SEO Specialist",
            company: "Moz",
            domain: "Marketing",
            workType: "Remote",
            ctc: "10-20",
            profile: "Entry Level",
            experience: "0-2 years",
            description: "Optimize website content for search engine rankings.",
            applyLink: "https://moz.com/about/jobs",
            skills: ["SEO", "Keyword Research", "Google Analytics", "Content Strategy"]
        },
        {
            id: 39,
            title: "Social Media Manager",
            company: "Twitter",
            domain: "Marketing",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Manage and grow social media presence for brand engagement.",
            applyLink: "https://careers.twitter.com/",
            skills: ["Social Media", "Content Creation", "Analytics", "Branding"]
        },
        {
            id: 40,
            title: "Brand Manager",
            company: "Nike",
            domain: "Marketing",
            workType: "Onsite",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Develop and execute brand strategies for global campaigns.",
            applyLink: "https://jobs.nike.com/",
            skills: ["Brand Management", "Marketing Strategy", "Creative Direction"]
        },
        {
            id: 41,
            title: "Email Marketing Specialist",
            company: "Mailchimp",
            domain: "Marketing",
            workType: "Remote",
            ctc: "10-20",
            profile: "Entry Level",
            experience: "0-2 years",
            description: "Design and optimize email marketing campaigns.",
            applyLink: "https://www.mailchimp.com/about/careers/",
            skills: ["Email Marketing", "CRM", "Content Creation", "Analytics"]
        },
        {
            id: 42,
            title: "Performance Marketing Manager",
            company: "LinkedIn",
            domain: "Marketing",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Manage paid advertising campaigns to drive user growth.",
            applyLink: "https://careers.linkedin.com/",
            skills: ["PPC", "Google Ads", "Social Media Ads", "Analytics"]
        },
        {
            id: 43,
            title: "Public Relations Manager",
            company: "Edelman",
            domain: "Marketing",
            workType: "Onsite",
            ctc: "20-30",
            profile: "Senior Level",
            experience: "5+ years",
            description: "Lead PR strategies to enhance brand reputation.",
            applyLink: "https://www.edelman.com/careers",
            skills: ["Public Relations", "Media Relations", "Crisis Management"]
        },
        {
            id: 44,
            title: "Content Strategist",
            company: "BuzzFeed",
            domain: "Marketing",
            workType: "Remote",
            ctc: "10-20",
            profile: "Mid Level",
            experience: "2-4 years",
            description: "Develop content strategies to engage online audiences.",
            applyLink: "https://www.buzzfeed.com/about/jobs",
            skills: ["Content Strategy", "SEO", "Social Media", "Analytics"]
        },
        {
            id: 45,
            title: "Influencer Marketing Manager",
            company: "TikTok",
            domain: "Marketing",
            workType: "Hybrid",
            ctc: "20-30",
            profile: "Mid Level",
            experience: "3-5 years",
            description: "Collaborate with influencers to promote brand campaigns.",
            applyLink: "https://careers.tiktok.com/",
            skills: ["Influencer Marketing", "Social Media", "Campaign Management"]
        }
    ];

    function renderJobs(filteredJobs) {
        const jobsList = $('#jobs-list');
        jobsList.empty();
        filteredJobs.forEach(job => {
            const jobCard = `
                <div class="job-card">
                    <h3>${job.title}</h3>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p><strong>Experience:</strong> ${job.experience}</p>
                    <p><strong>Work Type:</strong> ${job.workType}</p>
                    <p><strong>CTC:</strong> ${job.ctc} LPA</p>
                    <p><strong>Description:</strong> ${job.description}</p>
                    <p><strong>Skills:</strong> ${job.skills.join(', ')}</p>
                    <a href="${job.applyLink}" target="_blank" class="apply-button">Apply</a>
                </div>
            `;
            jobsList.append(jobCard);
        });
    }

    function applyFilters() {
        const domain = $('#domain').val();
        const workType = $('#work-type').val();
        const ctc = $('#ctc').val();
        const profile = $('#profile').val();

        let filteredJobs = jobs;

        if (domain) {
            filteredJobs = filteredJobs.filter(job => job.domain === domain);
        }
        if (workType) {
            filteredJobs = filteredJobs.filter(job => job.workType === workType);
        }
        if (ctc) {
            filteredJobs = filteredJobs.filter(job => job.ctc === ctc);
        }
        if (profile) {
            filteredJobs = filteredJobs.filter(job => job.profile === profile);
        }

        renderJobs(filteredJobs);
    }

    // Initial render
    renderJobs(jobs);

    // Filter button click
    $('#apply-filters').click(applyFilters);

    // Theme dropdown toggle
    $('.theme-button').click(function(e) {
        e.preventDefault();
        $(this).parent('.theme-dropdown').toggleClass('active');
    });

    // Theme selection
    $('.theme-option').click(function(e) {
        e.preventDefault();
        const theme = $(this).data('theme');
        $('body').removeClass('theme-light theme-dark theme-blue').addClass(theme);
        $('.theme-dropdown').removeClass('active'); // Close dropdown after selection
    });

    // Close dropdown when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.theme-dropdown').length) {
            $('.theme-dropdown').removeClass('active');
        }
    });
});