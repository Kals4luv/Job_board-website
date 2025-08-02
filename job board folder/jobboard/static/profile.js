// Save and display job seeker profile using localStorage

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profile-form');
    const preview = document.getElementById('profile-preview');

    // Load profile if exists
    const saved = localStorage.getItem('joblynk_profile');
    if (saved) {
        showProfile(JSON.parse(saved));
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const profile = {
            fullname: form.fullname.value,
            email: form.email.value,
            skills: form.skills.value,
            bio: form.bio.value
        };
        localStorage.setItem('joblynk_profile', JSON.stringify(profile));
        showProfile(profile);
    });

    function showProfile(profile) {
        preview.style.display = 'block';
        preview.innerHTML = `
            <h3>Profile Preview</h3>
            <p><strong>Name:</strong> ${profile.fullname}</p>
            <p><strong>Email:</strong> ${profile.email}</p>
            <p><strong>Skills:</strong> ${profile.skills}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <button id="edit-profile">Edit Profile</button>
        `;
        form.style.display = 'none';
        document.getElementById('edit-profile').onclick = function() {
            form.style.display = 'block';
            preview.style.display = 'none';
        };
    }
});
