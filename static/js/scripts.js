$(document).ready(function() {
    displayInitialMessage();
});

function displayInitialMessage() {
    let initialMessage = `
        <div class="chat-message bot">
            Hello! Select which domain you are interested to work in:
            <div class="button-container">
                <button onclick="selectDomain('Marketing')">Marketing</button>
                <button onclick="selectDomain('Software Developer')">Software Developer</button>
                <button onclick="selectDomain('Architect')">Architect</button>
                <button onclick="selectDomain('Management')">Management</button>
                <button onclick="selectDomain('Data Analyst/Scientist')">Data Analyst/Scientist</button>
            </div>
        </div>`;
    $('#chat-box').append(initialMessage);
    scrollChatToBottom();
}

function selectDomain(domain) {
    addUserMessage(domain);
    let uploadMessage = `
        <div class="chat-message bot">
            Please upload your resume:
            <div class="custom-file-upload">
                <input type="file" id="resume" name="resume">
                <label for="resume">Select File</label>
            </div>
        </div>`;
    $('#chat-box').append(uploadMessage);
    scrollChatToBottom();

    document.getElementById('resume').addEventListener('change', function() {
        uploadResume(domain);
    });
}

function uploadResume(domain) {
    let fileInput = document.getElementById('resume');
    let file = fileInput.files[0];
    let formData = new FormData();
    formData.append('file', file);

    showTypingIndicator();
    $.ajax({
        type: 'POST',
        url: '/upload_resume',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data) {
            hideTypingIndicator();
            let skills = data.skills;
            let file_path = data.file_path;
            addUserMessage(file.name);
            $.ajax({
                type: 'POST',
                url: '/get_jobs',
                contentType: 'application/json',
                data: JSON.stringify({ domain: domain }),
                success: function(jobs) {
                    let jobList = jobs.map(job => `
                        <div class="chat-message bot">
                            <b>Job Title:</b> ${job.title}<br>
                            <b>Responsibilities:</b> ${job.responsibilities}<br>
                            <b>Qualifications:</b> ${job.qualifications}<br>
                            <b>Openings:</b> ${job.openings}<br>
                            <button type="button" onclick='selectJob("${job.title}", ${JSON.stringify(job.required_skills)}, "${file_path.replace(/\\/g, '\\\\')}")'>Select</button>
                        </div>
                    `).join('');
                    $('#chat-box').append(jobList);
                    scrollChatToBottom();
                },
                error: function(error) {
                    console.error("Error loading jobs:", error);
                    hideTypingIndicator();
                }
            });
        },
        error: function(error) {
            console.error("Error uploading resume:", error);
            hideTypingIndicator();
        }
    });
}

function selectJob(jobTitle, requiredSkills, filePath) {
    addUserMessage(jobTitle);
    showTypingIndicator();
    $.ajax({
        type: 'POST',
        url: '/calculate_match',
        contentType: 'application/json',
        data: JSON.stringify({ file_path: filePath, required_skills: requiredSkills }),
        success: function(data) {
            hideTypingIndicator();
            let matchPercentage = data.match_percentage;
            let matchMessage = `<div class="chat-message bot">Your profile matches ${matchPercentage.toFixed(2)}% with the job: ${jobTitle}</div>`;
            $('#chat-box').append(matchMessage);
            scrollChatToBottom();
        },
        error: function(error) {
            console.error("Error calculating match percentage:", error);
            let errorMessage = `<div class="chat-message bot">Error calculating match percentage: ${error.responseJSON.error}</div>`;
            $('#chat-box').append(errorMessage);
            hideTypingIndicator();
            scrollChatToBottom();
        }
    });
}

function addUserMessage(message) {
    let userMessage = `<div class="chat-message user">${message}</div>`;
    $('#chat-box').append(userMessage);
    scrollChatToBottom();
}

function showTypingIndicator() {
    let typingIndicator = `<div class="chat-message bot typing-indicator">Voca Bot is typing...</div>`;
    $('#chat-box').append(typingIndicator);
    scrollChatToBottom();
}

function hideTypingIndicator() {
    $('.typing-indicator').remove();
}

function scrollChatToBottom() {
    $('#chat-box').scrollTop($('#chat-box')[0].scrollHeight);
}
