// Ensure Chart.js is loaded in your <head> via CDN
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

function initializeForensics(prediction, confidence, textContent) {
    if (!prediction) return;

    // 1. CONFIDENCE DOUGHNUT CHART
    const ctx = document.getElementById('resultChart').getContext('2d');
    const themeColor = (prediction === 'FAKE') ? '#ff4b4b' : '#22c55e';
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Confidence', 'Margin'],
            datasets: [{
                data: [confidence, 100 - confidence],
                backgroundColor: [themeColor, '#e2e8f0'],
                hoverOffset: 4,
                borderWidth: 0
            }]
        },
        options: {
            cutout: '80%',
            plugins: { legend: { display: false } },
            animation: { animateScale: true, duration: 2000 }
        }
    });

    // 2. LINGUISTIC ANALYSIS (Keyword Extraction)
    // This simulates finding "Clickbait" or "Suspicious" tokens in the text
    const suspiciousTokens = ['uunbelievable', 'shocking', 'miracle', 'conspiracy', 'secret', 'exposed'];
    const words = textContent.toLowerCase().split(/\s+/);
    const foundKeywords = words.filter(word => suspiciousTokens.includes(word));
    
    const keywordContainer = document.getElementById('keyword-list');
    if (foundKeywords.length > 0) {
        // Remove duplicates and display
        [...new Set(foundKeywords)].forEach(word => {
            let span = document.createElement('span');
            span.className = "badge bg-warning text-dark me-2 p-2";
            span.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${word}`;
            keywordContainer.appendChild(span);
        });
    } else {
        keywordContainer.innerHTML = '<span class="text-muted small">No high-risk linguistic flags detected.</span>';
    }
}

