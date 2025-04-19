$(document).ready(function() {
    // Sample post data
    const posts = [
        {
            id: 1,
            title: "Tips to Improve Your CV",
            author: "Jane Doe",
            date: "April 10, 2025",
            content: "Craft a standout CV with these 5 expert tips: tailor your resume to the job, use action verbs, quantify achievements, keep it concise, and proofread thoroughly.",
            hashtags: ["#CareerTips", "#ResumeBuilding"],
            type: "Blog"
        },
        {
            id: 2,
            title: "Google Interview Experience",
            author: "John Smith",
            date: "April 8, 2025",
            content: "My journey through Google's interview process: coding challenges, system design, and behavioral interviews. Preparation is key!",
            hashtags: ["#InterviewExperience", "#TechJobs"],
            type: "Blog"
        },
        {
            id: 3,
            title: "How to Ace an Interview",
            author: "Alex Johnson",
            date: "April 5, 2025",
            content: "Master your next interview with confidence: research the company, practice common questions, dress professionally, and follow up with a thank-you note.",
            hashtags: ["#InterviewTips", "#CareerAdvice"],
            type: "Blog"
        },
        {
            id: 4,
            title: "New Job Openings at Amazon",
            author: "ResumeSync Team",
            date: "April 3, 2025",
            content: "Amazon is hiring for multiple roles in software development and product management. Check out the latest opportunities!",
            hashtags: ["#JobSearch", "#TechJobs"],
            type: "Job Update"
        },
        {
            id: 5,
            title: "Tips for Personal Interviews",
            author: "Emma Brown",
            date: "April 1, 2025",
            content: "Excel in personal interviews by building rapport, showcasing your skills, and asking insightful questions.",
            hashtags: ["#InterviewTips", "#CareerTips"],
            type: "Blog"
        },
        {
            id: 6,
            title: "Why Networking Matters",
            author: "Michael Lee",
            date: "March 28, 2025",
            content: "Networking can open doors to new opportunities. Learn how to build and maintain professional relationships effectively.",
            hashtags: ["#Networking", "#CareerAdvice"],
            type: "Blog"
        },
        {
            id: 7,
            title: "Microsoft Data Scientist Roles Open",
            author: "ResumeSync Team",
            date: "March 25, 2025",
            content: "Exciting opportunities for data scientists at Microsoft. Apply now for hybrid and remote positions!",
            hashtags: ["#JobSearch", "#DataScience"],
            type: "Job Update"
        },
        {
            id: 8,
            title: "How to Negotiate Your Salary",
            author: "Sarah Davis",
            date: "March 20, 2025",
            content: "Negotiating your salary can be daunting. Follow these steps to confidently secure the compensation you deserve.",
            hashtags: ["#CareerTips", "#SalaryNegotiation"],
            type: "Blog"
        },
        {
            id: 9,
            title: "Building a LinkedIn Profile That Stands Out",
            author: "David Wilson",
            date: "March 15, 2025",
            content: "Optimize your LinkedIn profile with a professional photo, compelling summary, and detailed experience to attract recruiters.",
            hashtags: ["#LinkedIn", "#CareerAdvice"],
            type: "Blog"
        },
        {
            id: 10,
            title: "Tesla Hiring Machine Learning Engineers",
            author: "ResumeSync Team",
            date: "March 10, 2025",
            content: "Join Tesla’s AI team! Open positions for machine learning engineers with expertise in computer vision.",
            hashtags: ["#JobSearch", "#AIJobs"],
            type: "Job Update"
        },
        {
            id: 11,
            title: "Common Interview Mistakes to Avoid",
            author: "Laura Martinez",
            date: "March 5, 2025",
            content: "Steer clear of these pitfalls: arriving late, not researching the company, and failing to ask questions.",
            hashtags: ["#InterviewTips", "#CareerTips"],
            type: "Blog"
        },
        {
            id: 12,
            title: "Transitioning to a Tech Career",
            author: "Chris Thompson",
            date: "March 1, 2025",
            content: "Switching to tech? Learn about bootcamps, self-study, and networking to break into the industry.",
            hashtags: ["#CareerChange", "#TechJobs"],
            type: "Blog"
        },
        {
            id: 13,
            title: "Writing a Cover Letter That Gets Noticed",
            author: "Olivia Green",
            date: "February 25, 2025",
            content: "Craft a compelling cover letter by highlighting your unique value and aligning with the company’s mission.",
            hashtags: ["#CareerTips", "#ResumeBuilding"],
            type: "Blog"
        },
        {
            id: 14,
            title: "Facebook Marketing Specialist Openings",
            author: "ResumeSync Team",
            date: "February 20, 2025",
            content: "Facebook is seeking marketing specialists for remote roles. Apply today to join their team!",
            hashtags: ["#JobSearch", "#MarketingJobs"],
            type: "Job Update"
        },
        {
            id: 15,
            title: "Preparing for Behavioral Interviews",
            author: "James Carter",
            date: "February 15, 2025",
            content: "Use the STAR method to answer behavioral questions and showcase your problem-solving skills.",
            hashtags: ["#InterviewTips", "#CareerAdvice"],
            type: "Blog"
        }
    ];

    // Sample trending hashtags
    const trendingHashtags = [
        { hashtag: "#JobSearch", count: 120 },
        { hashtag: "#CareerTips", count: 95 },
        { hashtag: "#InterviewTips", count: 80 },
        { hashtag: "#TechJobs", count: 65 },
        { hashtag: "#CareerAdvice", count: 50 },
        { hashtag: "#ResumeBuilding", count: 45 },
        { hashtag: "#Networking", count: 40 },
        { hashtag: "#DataScience", count: 35 },
        { hashtag: "#AIJobs", count: 30 },
        { hashtag: "#MarketingJobs", count: 25 }
    ];

    function renderPosts(filteredPosts) {
        const postFeed = $('#post-feed');
        postFeed.empty();
        filteredPosts.forEach(post => {
            const postCard = `
                <div class="post-card">
                    <h3>${post.title}</h3>
                    <p class="post-meta"><strong>By:</strong> ${post.author} | <strong>Date:</strong> ${post.date} | <strong>Type:</strong> ${post.type}</p>
                    <p class="post-content">${post.content}</p>
                    <p class="post-hashtags"><strong>Hashtags:</strong> ${post.hashtags.join(', ')}</p>
                </div>
            `;
            postFeed.append(postCard);
        });
    }

    function renderHashtags() {
        const hashtagList = $('#hashtag-list');
        hashtagList.empty();
        trendingHashtags.forEach(hashtag => {
            const hashtagItem = `
                <div class="hashtag-item" data-hashtag="${hashtag.hashtag}">
                    ${hashtag.hashtag} (${hashtag.count})
                </div>
            `;
            hashtagList.append(hashtagItem);
        });
    }

    function applyHashtagFilter(hashtag) {
        let filteredPosts = posts;
        if (hashtag) {
            filteredPosts = posts.filter(post => post.hashtags.includes(hashtag));
        }
        renderPosts(filteredPosts);
    }

    // Initial render
    renderPosts(posts);
    renderHashtags();

    // Hashtag click handler
    $(document).on('click', '.hashtag-item', function() {
        const hashtag = $(this).data('hashtag');
        applyHashtagFilter(hashtag);
    });

    // Reset filter to show all posts
    $('#hashtag-list').prepend('<div class="hashtag-item" data-hashtag="">All Posts</div>');
    $(document).on('click', '[data-hashtag=""]', function() {
        applyHashtagFilter(null);
    });

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
        $('.theme-dropdown').removeClass('active');
    });

    // Close dropdown when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.theme-dropdown').length) {
            $('.theme-dropdown').removeClass('active');
        }
    });
});