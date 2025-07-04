// Accessibility Checker Tool - Main JavaScript
class A11yAuditor {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadTheme();
    }

    initializeElements() {
        this.htmlInput = document.getElementById('htmlInput');
        this.analyzeBtn = document.getElementById('analyzeBtn');
        this.resultsContent = document.getElementById('resultsContent');
        this.statusBadge = document.getElementById('statusBadge');
        this.themeToggle = document.getElementById('themeToggle');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.sampleBtn = document.getElementById('sampleBtn');
    }

    bindEvents() {
        this.analyzeBtn.addEventListener('click', () => this.analyzeAccessibility());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.downloadBtn.addEventListener('click', () => this.downloadReport());
        this.clearBtn.addEventListener('click', () => this.clearCode());
        this.sampleBtn.addEventListener('click', () => this.loadSampleCode());
        
        // Auto-resize textarea
        this.htmlInput.addEventListener('input', () => {
            this.htmlInput.style.height = 'auto';
            this.htmlInput.style.height = this.htmlInput.scrollHeight + 'px';
        });
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('a11y-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('a11y-theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    clearCode() {
        this.htmlInput.value = '';
        this.showWelcomeState();
    }

    loadSampleCode() {
        const sampleCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Sample Page</title>
</head>
<body>
    <header>
        <h1>Welcome to our site</h1>
        <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>About Us</h2>
            <img src="team-photo.jpg" width="300" height="200">
            <p>We are a passionate team dedicated to creating amazing experiences.</p>
        </section>
        
        <section>
            <h3>Contact Form</h3>
            <form>
                <input type="text" placeholder="Your name">
                <input type="email" placeholder="Your email">
                <textarea placeholder="Your message"></textarea>
                <button>Submit</button>
            </form>
        </section>
        
        <div>
            <button>Click here</button>
            <button>Read more</button>
        </div>
    </main>
    
    <footer>
        <p>&copy; 2024 Our Company</p>
    </footer>
</body>
</html>`;
        
        this.htmlInput.value = sampleCode;
        this.htmlInput.focus();
    }

    async analyzeAccessibility() {
        const htmlCode = this.htmlInput.value.trim();
        
        if (!htmlCode) {
            this.showError('Please enter some HTML code to analyze.');
            return;
        }

        this.showLoading();
        
        try {
            const issues = await this.performAnalysis(htmlCode);
            this.displayResults(issues);
        } catch (error) {
            this.showError('An error occurred during analysis. Please try again.');
            console.error('Analysis error:', error);
        }
    }

    async performAnalysis(htmlCode) {
        // Simulate async processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const issues = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlCode, 'text/html');
        
        // Check for missing alt attributes on images
        const images = doc.querySelectorAll('img');
        images.forEach((img, index) => {
            if (!img.hasAttribute('alt')) {
                issues.push({
                    type: 'error',
                    title: 'Missing alt attribute on image',
                    description: 'Images without alt text are not accessible to screen readers.',
                    element: img.outerHTML,
                    suggestion: 'Add a descriptive alt attribute to the image.',
                    code: `<img src="${img.src}" alt="Description of the image">`
                });
            } else if (img.alt.trim() === '') {
                issues.push({
                    type: 'warning',
                    title: 'Empty alt attribute on image',
                    description: 'Empty alt attributes may indicate decorative images that should be hidden from screen readers.',
                    element: img.outerHTML,
                    suggestion: 'Either add descriptive alt text or use alt="" for decorative images.',
                    code: img.alt === '' ? `<img src="${img.src}" alt="">` : `<img src="${img.src}" alt="Description of the image">`
                });
            }
        });

        // Check for missing form labels
        const inputs = doc.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            const id = input.getAttribute('id');
            const name = input.getAttribute('name');
            const placeholder = input.getAttribute('placeholder');
            
            if (!id && !name) {
                issues.push({
                    type: 'error',
                    title: 'Form input missing id and name attributes',
                    description: 'Form inputs should have unique identifiers for proper labeling and accessibility.',
                    element: input.outerHTML,
                    suggestion: 'Add both id and name attributes to the input element.',
                    code: `<input type="${input.type}" id="unique-id" name="field-name" placeholder="${placeholder || ''}">`
                });
            } else if (id && !doc.querySelector(`label[for="${id}"]`)) {
                issues.push({
                    type: 'warning',
                    title: 'Form input missing associated label',
                    description: 'Form inputs should have associated labels for better accessibility.',
                    element: input.outerHTML,
                    suggestion: 'Add a label element with the for attribute matching the input id.',
                    code: `<label for="${id}">Field Label</label>\n<input type="${input.type}" id="${id}" name="${name || id}">`
                });
            }
        });

        // Check heading hierarchy
        const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        let previousLevel = 0;
        
        headings.forEach(heading => {
            const currentLevel = parseInt(heading.tagName.charAt(1));
            
            if (currentLevel - previousLevel > 1) {
                issues.push({
                    type: 'warning',
                    title: 'Skipped heading level',
                    description: `Heading hierarchy jumps from h${previousLevel} to h${currentLevel}, which can confuse screen reader users.`,
                    element: heading.outerHTML,
                    suggestion: 'Use heading levels in sequential order (h1 → h2 → h3, etc.).',
                    code: `<!-- Add missing h${previousLevel + 1} heading before this -->\n${heading.outerHTML}`
                });
            }
            previousLevel = currentLevel;
        });

        // Check for non-descriptive button text
        const buttons = doc.querySelectorAll('button');
        buttons.forEach(button => {
            const text = button.textContent.trim().toLowerCase();
            const nonDescriptiveTexts = ['click here', 'click', 'submit', 'button', 'ok', 'yes', 'no'];
            
            if (nonDescriptiveTexts.includes(text)) {
                issues.push({
                    type: 'warning',
                    title: 'Non-descriptive button text',
                    description: 'Button text should clearly describe the action it performs.',
                    element: button.outerHTML,
                    suggestion: 'Use more descriptive text that explains what the button does.',
                    code: `<button>${this.getBetterButtonText(text)}</button>`
                });
            }
        });

        // Check for missing ARIA attributes on interactive elements
        const interactiveElements = doc.querySelectorAll('button, a, input, textarea, select');
        interactiveElements.forEach(element => {
            if (element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby')) {
                return; // Already has ARIA attributes
            }
            
            const text = element.textContent.trim();
            const placeholder = element.getAttribute('placeholder');
            const title = element.getAttribute('title');
            
            if (!text && !placeholder && !title) {
                issues.push({
                    type: 'info',
                    title: 'Interactive element may need ARIA attributes',
                    description: 'Interactive elements without visible text may need ARIA attributes for screen readers.',
                    element: element.outerHTML,
                    suggestion: 'Add aria-label, aria-labelledby, or ensure the element has accessible text content.',
                    code: `<${element.tagName.toLowerCase()} aria-label="Description of the action">${element.innerHTML}</${element.tagName.toLowerCase()}>`
                });
            }
        });

        // Check for color contrast issues (basic check)
        const elementsWithColor = doc.querySelectorAll('[style*="color"], [style*="background"]');
        if (elementsWithColor.length > 0) {
            issues.push({
                type: 'info',
                title: 'Color contrast check needed',
                description: 'Elements with inline color styles should be checked for sufficient color contrast.',
                element: `${elementsWithColor.length} elements with color styles found`,
                suggestion: 'Use a color contrast checker to ensure text meets WCAG guidelines (4.5:1 for normal text, 3:1 for large text).',
                code: '<!-- Consider using CSS custom properties for consistent, accessible colors -->'
            });
        }

        return issues;
    }

    getBetterButtonText(originalText) {
        const suggestions = {
            'click here': 'Learn more about our services',
            'click': 'View details',
            'submit': 'Send message',
            'button': 'Continue to next step',
            'ok': 'Confirm selection',
            'yes': 'Confirm action',
            'no': 'Cancel action'
        };
        return suggestions[originalText] || 'Perform action';
    }

    showLoading() {
        this.analyzeBtn.disabled = true;
        this.analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        
        this.resultsContent.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Analyzing your HTML code...</p>
            </div>
        `;
        
        this.updateStatus('Analyzing...', 'info');
    }

    displayResults(issues) {
        this.analyzeBtn.disabled = false;
        this.analyzeBtn.innerHTML = '<i class="fas fa-search"></i> Analyze Accessibility';
        
        if (issues.length === 0) {
            this.showEmptyState();
            return;
        }

        const errorCount = issues.filter(issue => issue.type === 'error').length;
        const warningCount = issues.filter(issue => issue.type === 'warning').length;
        const infoCount = issues.filter(issue => issue.type === 'info').length;

        let statusClass = 'success';
        let statusText = 'Analysis complete';
        
        if (errorCount > 0) {
            statusClass = 'error';
            statusText = `${errorCount} critical issues found`;
        } else if (warningCount > 0) {
            statusClass = 'warning';
            statusText = `${warningCount} warnings found`;
        }

        this.updateStatus(statusText, statusClass);

        const issuesHTML = issues.map(issue => this.createIssueCard(issue)).join('');
        
        this.resultsContent.innerHTML = `
            <div class="results-summary-stats">
                <div class="stat-item">
                    <span class="stat-number error">${errorCount}</span>
                    <span class="stat-label">Errors</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number warning">${warningCount}</span>
                    <span class="stat-label">Warnings</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number info">${infoCount}</span>
                    <span class="stat-label">Info</span>
                </div>
            </div>
            ${issuesHTML}
        `;

        // Store results for download
        this.currentResults = issues;
    }

    createIssueCard(issue) {
        const iconMap = {
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        return `
            <div class="issue-card">
                <div class="issue-header">
                    <div class="issue-icon ${issue.type}">
                        <i class="${iconMap[issue.type]}"></i>
                    </div>
                    <div class="issue-content">
                        <h4>${issue.title}</h4>
                        <p>${issue.description}</p>
                    </div>
                </div>
                <div class="issue-details">
                    <h5><i class="fas fa-code"></i> Current Code</h5>
                    <code>${this.escapeHtml(issue.element)}</code>
                    
                    <h5><i class="fas fa-lightbulb"></i> Suggestion</h5>
                    <p>${issue.suggestion}</p>
                    
                    <h5><i class="fas fa-wrench"></i> Fixed Code</h5>
                    <code>${this.escapeHtml(issue.code)}</code>
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showEmptyState() {
        this.resultsContent.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-check-circle"></i>
                <h3>Great job! 🎉</h3>
                <p>No accessibility issues found in your HTML code. Keep up the good work!</p>
            </div>
        `;
        this.updateStatus('No issues found', 'success');
    }

    showWelcomeState() {
        this.resultsContent.innerHTML = `
            <div class="welcome-state">
                <div class="welcome-icon">
                    <i class="fas fa-hand-peace"></i>
                </div>
                <h3>Ready to check your code?</h3>
                <p>Paste your HTML code on the left and click "Analyze Accessibility" to get started!</p>
            </div>
        `;
        this.updateStatus('Ready to analyze', 'info');
    }

    showError(message) {
        this.resultsContent.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
            </div>
        `;
        this.updateStatus('Error occurred', 'error');
    }

    updateStatus(text, type) {
        this.statusBadge.textContent = text;
        this.statusBadge.className = `status-badge ${type}`;
        
        const icon = this.statusBadge.querySelector('i');
        const iconMap = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };
        
        if (icon) {
            icon.className = iconMap[type] || 'fas fa-info-circle';
        }
    }

    downloadReport() {
        if (!this.currentResults) {
            alert('No analysis results to download. Please analyze some code first.');
            return;
        }

        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                total: this.currentResults.length,
                errors: this.currentResults.filter(issue => issue.type === 'error').length,
                warnings: this.currentResults.filter(issue => issue.type === 'warning').length,
                info: this.currentResults.filter(issue => issue.type === 'info').length
            },
            issues: this.currentResults
        };

        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `a11y-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new A11yAuditor();
});
