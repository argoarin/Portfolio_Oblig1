document.addEventListener("DOMContentLoaded", () => {
    const projectForm = document.getElementById('formID');
    const mainSection = document.getElementById('mainSection');

    function displayProjects(projects) {
        mainSection.innerHTML = '';
        projects.forEach(project => {
            const article = document.createElement('article');
            article.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <footer>
                    <p> <time datetime="${project.startDate}">${project.startDate}</time> - <time datetime="${project.endDate}">${project.endDate}</time></p>
                </footer>
            `;
            mainSection.appendChild(article);
        });
    }

    async function fetchAndDisplayProjects() {
        try {
            const response = await fetch('http://127.0.0.1:4001/json');
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const projects = await response.json();
            displayProjects(projects);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    }

    projectForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('name').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const description = document.getElementById('message').value;

        
        const newProject = {
            title,
            description,
            image: 'https://via.placeholder.com/150', 
            startDate,
            endDate
        };

        try {
            const response = await fetch('http://127.0.0.1:4001/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProject)
            });
            if (!response.ok) {
                throw new Error('Failed to submit project');
            }

            await fetchAndDisplayProjects();

            projectForm.reset();
        } catch (error) {
            console.error('Error submitting project:', error);
        }
    });

    
    fetchAndDisplayProjects();
});
