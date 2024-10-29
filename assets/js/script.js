// $(function() {
//     $("#datepicker").datepicker({
//         showOtherMonths: true,
//         selectOtherMonths: true
//     });
// });



 // Wait for the DOM to load
 document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const leagueFilter = document.getElementById('leagueFilter');
    const oddsFilter = document.getElementById('oddsFilter');
    const datePicker = document.getElementById('datePickers');
    const matchSections = document.querySelectorAll('.tab-pane');

    // Add event listeners to filters
    leagueFilter.addEventListener('change', filterMatches);
    oddsFilter.addEventListener('change', filterMatches);
    datePicker.addEventListener('input', filterMatches);

    // Filter function to show/hide matches
    function filterMatches() {
        const selectedLeague = leagueFilter.value;
        const selectedOdds = oddsFilter.value;
        const selectedDate = datePicker.value;

        // Loop through each match section and apply filters
        matchSections.forEach(section => {
            const matches = section.querySelectorAll('.prediction-table');

            matches.forEach(match => {
                // Get match data (you'll need to store data attributes for each match)
                const matchLeague = match.getAttribute('data-league'); // e.g., 308 or 209
                const matchOdds = parseFloat(match.getAttribute('data-odds')); // e.g., 1.75
                const matchDate = match.getAttribute('data-date'); // e.g., 2024-10-29

                // Apply filters
                const leagueMatches = selectedLeague === 'all' || matchLeague === selectedLeague;
                const oddsMatches = selectedOdds === 'all' || matchOdds >= parseFloat(selectedOdds);
                const dateMatches = !selectedDate || matchDate === selectedDate;

                // Show or hide match based on filters
                match.style.display = leagueMatches && oddsMatches && dateMatches ? 'block' : 'none';
            });
        });
    }
});

// see All
function toggleMatches() {
    const hiddenMatches = document.querySelectorAll('.hidden-match');
    const seeAllBtn = document.getElementById('seeAllBtn');

    // Check if currently showing all matches
    if (seeAllBtn.textContent === 'See All') {
        // Show hidden matches
        hiddenMatches.forEach(match => {
            match.classList.add('visible-match');
            match.classList.remove('hidden-match');
        });
        seeAllBtn.textContent = 'See Less';
    } else {
        // Hide only the hidden matches to return to the original state
        hiddenMatches.forEach(match => {
            match.classList.add('hidden-match');
            match.classList.remove('visible-match');
        });
        seeAllBtn.textContent = 'See All';
    }
}

