export const fetchDebates = async () => {
    const response = await fetch('/api/debates');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const createDebate = async (debateData) => {
    const response = await fetch('/api/debates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(debateData),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const updateDebate = async (debateId, debateData) => {
    const response = await fetch(`/api/debates/${debateId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(debateData),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const deleteDebate = async (debateId) => {
    const response = await fetch(`/api/debates/${debateId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};