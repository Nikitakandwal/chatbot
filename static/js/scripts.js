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
                    let jobList = `<div class="chat-message bot">Here are the openings in the selected domain:</div>`;
                    jobs.forEach(job => {
                        jobList += `
                            <div class="chat-message bot job-listing">
                                <b>Job Title:</b> ${job.title}<br>
                                <b>Responsibilities:</b> ${job.responsibilities}<br>
                                <b>Qualifications:</b> ${job.qualifications}<br>
                                <b>Openings:</b> ${job.openings}<br>
                                <button type="button" onclick='selectJob("${job.title}", ${JSON.stringify(job.required_skills)}, "${file_path.replace(/\\/g, '\\\\')}")'>Check Match</button>
                            </div>
                        `;
                    });
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
            let matchMessage = `
                <div class="chat-message bot">
                    Your profile matches <b>${matchPercentage.toFixed(2)}%</b> with the job: ${jobTitle}
                    <span class="suggestion-bulb" data-file-path="${filePath.replace(/\\/g, '\\\\')}" data-required-skills='${JSON.stringify(requiredSkills)}'>💡</span>
                </div>`;
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
 

$(document).on('click', '.suggestion-bulb', function() {
    let filePath = $(this).data('file-path');
    let requiredSkills = $(this).data('required-skills');
    showSuggestions(filePath, requiredSkills);
});

function showSuggestions(filePath, requiredSkills) {
    console.log("Bulb clicked! File path:", filePath);
    console.log("Required skills:", requiredSkills);
 
    let suggestionsMessage = `
        <div class="suggestion-box">
            <span class="close-btn" onclick="closeSuggestionBox()">×</span>
            <div class="suggestion-title">Here are some suggestions to improve your resume:</div>
            <ul>
                <li>Consider learning Python.</li>
                <li>Improve your communication skills.</li>
                <li>Gain experience with cloud platforms like AWS.</li>
            </ul>
        </div>
    `;
 
    $('.chat-message.bot').last().append(suggestionsMessage);
    $('.suggestion-box').fadeIn(300);
}

function closeSuggestionBox() {
    $('.suggestion-box').fadeOut(300, function() {
        $(this).remove();
    });
}