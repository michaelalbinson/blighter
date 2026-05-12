'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-form');
    const msg = document.getElementById('status-msg');

    function showMsg(text, isError = false) {
        msg.textContent = text;
        msg.classList.toggle('error', isError);
        msg.classList.add('visible');
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msg.classList.remove('visible', 'error');

        const body = new URLSearchParams({
            url: document.getElementById('url').value,
            title: document.getElementById('title').value,
        });

        try {
            const res = await fetch('/item', {
                method: 'POST',
                body,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            const data = await res.json().catch(() => ({}));

            if (res.ok) {
                showMsg(`Added "${data.title || body.get('url')}" to your reading list.`);
                form.reset();
            } else if (res.status === 409) {
                showMsg(`Already in your reading list: ${data.title || body.get('url')}`);
            } else {
                showMsg('Something went wrong — the item could not be added.', true);
            }
        } catch {
            showMsg('Could not reach the server.', true);
        }
    });
});
