// Demo job data (replace with API or backend in real app)
const jobs = [
    { title: 'Frontend Developer', company: 'Awesome Tech Inc.', location: 'Remote', description: 'Work on modern web apps.' },
    { title: 'Backend Engineer', company: 'Innovatech', location: 'New York, NY', description: 'Build scalable APIs.' },
    { title: 'UI/UX Designer', company: 'DesignPro', location: 'San Francisco, CA', description: 'Design beautiful interfaces.' },
    { title: 'Data Analyst', company: 'DataWiz', location: 'Remote', description: 'Analyze and visualize data.' },
    { title: 'Project Manager', company: 'BuildIt', location: 'Chicago, IL', description: 'Lead project teams.' }
];

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('search-form');
    const results = document.getElementById('search-results');

    function renderJobs(filtered) {
        results.innerHTML = '';
        if (filtered.length === 0) {
            results.innerHTML = '<p>No jobs found.</p>';
            return;
        }
        filtered.forEach(job => {
            const div = document.createElement('div');
            div.className = 'job-card';
            div.innerHTML = `
                <h4>${job.title}</h4>
                <p>${job.company} - ${job.location}</p>
                <p>${job.description}</p>
                <button class="apply-btn">Apply Now</button>
            `;
            results.appendChild(div);
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const keyword = document.getElementById('search-keyword').value.toLowerCase();
        const location = document.getElementById('search-location').value.toLowerCase();
        const filtered = jobs.filter(job =>
            (job.title.toLowerCase().includes(keyword) || job.company.toLowerCase().includes(keyword)) &&
            (location === '' || job.location.toLowerCase().includes(location))
        );
        renderJobs(filtered);
    });

    // Show all jobs by default
    renderJobs(jobs);
});
