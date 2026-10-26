// These are the five fixed forms, not user-editable field definitions.
export const sections = {
    projects: {
        label: 'Projects', singular: 'project', title: 'title', subtitle: 'category', imageLimit: 1, technologies: true,
        fields: [
            { name: 'title', label: 'Title', required: true },
            { name: 'slug', label: 'Slug', hint: 'Leave empty on creation to generate from the title. Changing an existing slug changes its public URL.' },
            { name: 'short_description', label: 'Summary', type: 'textarea', max: 500 },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'category', label: 'Category', required: true, max: 100, default: 'Web Development' },
            { name: 'year', label: 'Year', max: 16 },
            { name: 'github_url', label: 'GitHub URL', type: 'url' },
            { name: 'demo_url', label: 'Demo URL', type: 'url' },
            { name: 'featured', label: 'Featured on the homepage', type: 'checkbox' },
            { name: 'architecture', label: 'Architecture', type: 'textarea' },
            { name: 'challenge', label: 'Challenge', type: 'textarea' },
            { name: 'solution', label: 'Solution', type: 'textarea' },
            { name: 'result', label: 'Result', type: 'textarea' },
        ],
    },
    experiences: {
        label: 'Experiences', singular: 'experience', title: 'company', subtitle: 'position', imageLimit: 3, technologies: true,
        fields: [
            { name: 'company', label: 'Company', required: true },
            { name: 'position', label: 'Position', required: true },
            { name: 'location', label: 'Location' },
            { name: 'start_date', label: 'Start date', type: 'date' },
            { name: 'end_date', label: 'End date', type: 'date', hint: 'Leave empty for an ongoing position.' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'featured', label: 'Featured experience', type: 'checkbox' },
        ],
    },
    certificates: {
        label: 'Certificates', singular: 'certificate', title: 'title', subtitle: 'issuer', imageLimit: 1,
        fields: [
            { name: 'title', label: 'Title', required: true },
            { name: 'issuer', label: 'Issuer', required: true },
            { name: 'year', label: 'Year', max: 16 },
            { name: 'credential_url', label: 'Credential URL', type: 'url' },
            { name: 'description', label: 'Description', type: 'textarea' },
        ],
    },
    educations: {
        label: 'Education', singular: 'education record', title: 'degree', subtitle: 'institution',
        fields: [
            { name: 'degree', label: 'Degree', required: true },
            { name: 'institution', label: 'Institution', required: true },
            { name: 'location', label: 'Location' },
            { name: 'period', label: 'Period', hint: 'For example: 2020–2024.' },
            { name: 'gpa', label: 'GPA' },
            { name: 'thesis', label: 'Thesis', type: 'textarea' },
            { name: 'description', label: 'Description', type: 'textarea' },
        ],
    },
    technologies: {
        label: 'Skills & technologies', singular: 'technology', title: 'name', subtitle: 'category',
        fields: [
            { name: 'name', label: 'Name', required: true },
            { name: 'slug', label: 'Slug', hint: 'Leave empty on creation to generate from the name.' },
            { name: 'category', label: 'Category', required: true, type: 'select', default: 'other', options: ['frontend', 'backend', 'data', 'tools', 'other'] },
        ],
    },
};
