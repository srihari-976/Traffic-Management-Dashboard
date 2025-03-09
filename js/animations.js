// Intersection Observer for animations
const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.chart, .card, .stats-card').forEach(el => {
        observer.observe(el);
    });
};

// Smooth number counter animation
const animateNumbers = () => {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                el.textContent = target.toLocaleString();
            }
        };

        updateNumber();
    });
};

// Progress bar animation
const animateProgress = () => {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const value = bar.getAttribute('data-value') || '0';
        bar.style.setProperty('--progress-value', `${value}%`);
    });
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Chart animations with loading states
const initializeCharts = () => {
    document.querySelectorAll('.chart').forEach(chart => {
        chart.insertAdjacentHTML('beforeend', '<div class="loading"></div>');
        
        // Simulate data loading
        setTimeout(() => {
            chart.querySelector('.loading').remove();
            chart.classList.add('loaded');
        }, 1000);
    });
};

// Tooltip initialization
const initializeTooltips = () => {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', e => {
            const tooltip = e.target.getAttribute('data-tooltip');
            if (tooltip) {
                const tooltipEl = document.createElement('div');
                tooltipEl.className = 'tooltip';
                tooltipEl.textContent = tooltip;
                document.body.appendChild(tooltipEl);

                const rect = e.target.getBoundingClientRect();
                tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 10}px`;
                tooltipEl.style.left = `${rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2)}px`;
            }
        });

        el.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
};

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateNumbers();
    animateProgress();
    initializeCharts();
    initializeTooltips();
});

// Refresh animations on dynamic content updates
const refreshAnimations = () => {
    animateOnScroll();
    animateProgress();
    initializeTooltips();
};

// Add smooth transitions for data updates
const updateData = (element, value, animate = true) => {
    if (animate) {
        element.style.transition = 'opacity 0.3s ease';
        element.style.opacity = '0';
        setTimeout(() => {
            element.textContent = value;
            element.style.opacity = '1';
        }, 300);
    } else {
        element.textContent = value;
    }
};

// Export functions for use in other scripts
window.dashboardAnimations = {
    refreshAnimations,
    updateData,
    animateNumbers,
    animateProgress
}; 