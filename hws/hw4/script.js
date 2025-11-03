document.getElementById('subjectForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        teacher: document.getElementById('teacher').value,
        description: document.getElementById('description').value,
        group: document.getElementById('group').value,
        credits: document.getElementById('credits').value
    };

    try {
        const response = await fetch('validate.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        const resultDiv = document.getElementById('result');

        if (result.success) {
            resultDiv.className = 'success';
            resultDiv.textContent = JSON.stringify(result, null, 2);
        } else {
            resultDiv.className = 'error';
            resultDiv.textContent = JSON.stringify(result, null, 2);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').className = 'error';
        document.getElementById('result').textContent = 'Възникна грешка при изпращането на формата.';
    }
}); 