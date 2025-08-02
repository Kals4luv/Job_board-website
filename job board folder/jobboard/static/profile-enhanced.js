// Enhanced profile page JS: profile picture, education, experience, social links, skills as tags, saved jobs, PDF download

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profile-form');
    const preview = document.getElementById('profile-preview');
    const skillsInput = document.getElementById('skills');
    const skillsTags = document.getElementById('skills-tags');
    const addSkillBtn = document.getElementById('add-skill');
    const profilePicInput = document.getElementById('profile-pic');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const addEduBtn = document.getElementById('add-edu');
    const eduList = document.getElementById('edu-list');
    const addExpBtn = document.getElementById('add-exp');
    const expList = document.getElementById('exp-list');
    const addJobBtn = document.getElementById('add-job');
    const jobsList = document.getElementById('jobs-list');
    const downloadBtn = document.getElementById('download-pdf');

    // Load profile if exists
    const saved = localStorage.getItem('joblynk_profile');
    if (saved) {
        showProfile(JSON.parse(saved));
    }

    // Profile picture preview
    profilePicInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(evt) {
                profilePicPreview.src = evt.target.result;
                profilePicPreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Skills as tags
    addSkillBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const skill = skillsInput.value.trim();
        if (skill) {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.textContent = skill;
            tag.onclick = function() { skillsTags.removeChild(tag); };
            skillsTags.appendChild(tag);
            skillsInput.value = '';
        }
    });

    // Add education
    addEduBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const school = document.getElementById('edu-school').value.trim();
        const degree = document.getElementById('edu-degree').value.trim();
        if (school && degree) {
            const li = document.createElement('li');
            li.textContent = `${school} - ${degree}`;
            li.onclick = function() { eduList.removeChild(li); };
            eduList.appendChild(li);
            document.getElementById('edu-school').value = '';
            document.getElementById('edu-degree').value = '';
        }
    });

    // Add experience
    addExpBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const company = document.getElementById('exp-company').value.trim();
        const role = document.getElementById('exp-role').value.trim();
        if (company && role) {
            const li = document.createElement('li');
            li.textContent = `${company} - ${role}`;
            li.onclick = function() { expList.removeChild(li); };
            expList.appendChild(li);
            document.getElementById('exp-company').value = '';
            document.getElementById('exp-role').value = '';
        }
    });

    // Add saved job
    addJobBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const job = document.getElementById('saved-job').value.trim();
        if (job) {
            const li = document.createElement('li');
            li.textContent = job;
            li.onclick = function() { jobsList.removeChild(li); };
            jobsList.appendChild(li);
            document.getElementById('saved-job').value = '';
        }
    });

    // Save profile
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const skills = Array.from(skillsTags.children).map(tag => tag.textContent);
        const education = Array.from(eduList.children).map(li => li.textContent);
        const experience = Array.from(expList.children).map(li => li.textContent);
        const jobs = Array.from(jobsList.children).map(li => li.textContent);
        const profile = {
            fullname: form.fullname.value,
            email: form.email.value,
            bio: form.bio.value,
            profilePic: profilePicPreview.src || '',
            skills,
            education,
            experience,
            jobs,
            linkedin: form.linkedin.value,
            github: form.github.value,
            website: form.website.value
        };
        localStorage.setItem('joblynk_profile', JSON.stringify(profile));
        showProfile(profile);
    });

    // Download as PDF (simple print)
    downloadBtn.addEventListener('click', function() {
        window.print();
    });

    function showProfile(profile) {
        preview.style.display = 'block';
        preview.innerHTML = `
            <h3>Profile Preview</h3>
            <img src="${profile.profilePic}" alt="Profile Picture" style="max-width:100px; border-radius:50%; margin-bottom:1em;" onerror="this.style.display='none'">
            <p><strong>Name:</strong> ${profile.fullname}</p>
            <p><strong>Email:</strong> ${profile.email}</p>
            <p><strong>Skills:</strong> ${profile.skills.join(', ')}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Education:</strong></p>
            <ul>${profile.education.map(e => `<li>${e}</li>`).join('')}</ul>
            <p><strong>Experience:</strong></p>
            <ul>${profile.experience.map(e => `<li>${e}</li>`).join('')}</ul>
            <p><strong>Saved Jobs:</strong></p>
            <ul>${profile.jobs.map(j => `<li>${j}</li>`).join('')}</ul>
            <p><strong>Links:</strong> 
                <a href="${profile.linkedin}" target="_blank">LinkedIn</a> | 
                <a href="${profile.github}" target="_blank">GitHub</a> | 
                <a href="${profile.website}" target="_blank">Website</a>
            </p>
            <button id="edit-profile">Edit Profile</button>
        `;
        form.style.display = 'none';
        document.getElementById('edit-profile').onclick = function() {
            form.style.display = 'block';
            preview.style.display = 'none';
        };
    }
});
