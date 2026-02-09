// Custom Cursor Logic
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add some lag to the outline for fluid feel
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Interactive Elements Hover Effect for Cursor
const hoverElements = document.querySelectorAll('a, .work-item, .menu-btn, .line.outline');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '80px';
        cursorOutline.style.height = '80px';
        cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        cursorOutline.style.backdropFilter = 'invert(1)';
    });

    el.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.backdropFilter = 'none';
    });
});

// Smooth Reveal on Scroll Implementation (Vanilla Intersection Observer)
const revealElements = document.querySelectorAll('.section-heading, .big-text, .work-item');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
});

// Work Image Float Effect (Advanced Mouse Tracking within Item)
const workItems = document.querySelectorAll('.work-item');

workItems.forEach(item => {
    const img = item.querySelector('.work-img');

    if (img) {
        item.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to the item
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Move image
            // We want the image to follow cursor but stay within constraints approx
            // Or just update translation
            // Since .work-img is absolute, we can just set left/top with some offset

            // Actually, CSS hover handles opacity. We just want to move it to cursor Y.
            // X is fixed to the right for design, but we can make it follow slightly.

            // Let's make it follow cursor X somewhat
            // Map x to a range
            const moveX = (x / rect.width) * 50;

            img.style.transform = `translate(${moveX - 150}px, -50%) scale(1)`;
            // -150px to center it roughly if we assume cursor is center of image, 
            // but we want it to the right. 
            // simpler approach: just change top/left

            // Let's stick to the CSS logic for showing/hiding, but use JS for "magnetic" feel if requested.
            // For now, the CSS :hover implementation is clean and "simple html css js" friendly.
            // We will skip complex JS math for this specific request to keep it performant and robust.
        });
    }
});
