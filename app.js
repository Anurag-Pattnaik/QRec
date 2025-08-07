class QuestionRecorder {
    constructor() {
        this.currentTopic = null;
        this.topics = {};
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.currentRecording = null;
        this.editingQuestionIndex = null;
        this.microphonePermission = null;
        this.currentTheme = localStorage.getItem('qrec-theme') || 'light';

        // Enhanced CS topics with color schemes
        this.defaultTopicsData = {
            dm: {
                name: "Discrete Mathematics",
                color: "bg-purple",
                questions: [
                    {"notes": "", "shorthand": "Set Theory", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Relations & Functions", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Graph Theory", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Combinatorics", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Logic & Proofs", "hasImage": false, "hasAudio": false}
                ]
            },
            em: {
                name: "Engineering Mathematics",
                color: "bg-blue",
                questions: [
                    {"notes": "", "shorthand": "Linear Algebra", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Calculus", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Differential Equations", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Probability", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Complex Analysis", "hasImage": false, "hasAudio": false}
                ]
            },
            toc: {
                name: "Theory of Computation",
                color: "bg-green",
                questions: [
                    {"notes": "", "shorthand": "Finite Automata", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Context-Free Grammar", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Turing Machine", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Decidability", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Complexity Classes", "hasImage": false, "hasAudio": false}
                ]
            },
            cd: {
                name: "Compiler Design",
                color: "bg-orange",
                questions: [
                    {"notes": "", "shorthand": "Lexical Analysis", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Syntax Analysis", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Semantic Analysis", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Code Generation", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Code Optimization", "hasImage": false, "hasAudio": false}
                ]
            },
            coa: {
                name: "Computer Organization",
                color: "bg-teal",
                questions: [
                    {"notes": "", "shorthand": "Instruction Set", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "CPU Design", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Memory Hierarchy", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "I/O Systems", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Pipeline & Hazards", "hasImage": false, "hasAudio": false}
                ]
            },
            os: {
                name: "Operating Systems",
                color: "bg-red",
                questions: [
                    {"notes": "", "shorthand": "Process Management", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Memory Management", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "File Systems", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Synchronization", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Deadlock", "hasImage": false, "hasAudio": false}
                ]
            },
            cn: {
                name: "Computer Networks",
                color: "bg-indigo",
                questions: [
                    {"notes": "", "shorthand": "OSI Model", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "TCP/UDP", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Routing Algorithms", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Network Security", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Error Detection", "hasImage": false, "hasAudio": false}
                ]
            },
            ds: {
                name: "Data Structures",
                color: "bg-pink",
                questions: [
                    {"notes": "", "shorthand": "Arrays & Linked Lists", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Stacks & Queues", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Trees & BST", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Graphs", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Hash Tables", "hasImage": false, "hasAudio": false}
                ]
            },
            algo: {
                name: "Algorithms",
                color: "bg-yellow",
                questions: [
                    {"notes": "", "shorthand": "Sorting Algorithms", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Divide & Conquer", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Dynamic Programming", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Greedy Algorithms", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Graph Algorithms", "hasImage": false, "hasAudio": false}
                ]
            },
            dbms: {
                name: "Database Management",
                color: "bg-cyan",
                questions: [
                    {"notes": "", "shorthand": "ER Diagrams", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Normalization", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "SQL Queries", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Transactions", "hasImage": false, "hasAudio": false},
                    {"notes": "", "shorthand": "Indexing", "hasImage": false, "hasAudio": false}
                ]
            }
        };

        // Default template for new custom topics
        this.defaultQuestionTemplate = [
            {"notes": "", "shorthand": "Key Concepts", "hasImage": false, "hasAudio": false},
            {"notes": "", "shorthand": "Practice Problems", "hasImage": false, "hasAudio": false},
            {"notes": "", "shorthand": "Real-world Applications", "hasImage": false, "hasAudio": false},
            {"notes": "", "shorthand": "Common Mistakes", "hasImage": false, "hasAudio": false},
            {"notes": "", "shorthand": "Summary & Formulas", "hasImage": false, "hasAudio": false}
        ];
    }

    init() {
        try {
            console.log('Initializing Question Recorder...');
            this.loadData();
            this.setupEventListeners();
            this.initTheme();
            this.renderDashboard();
            this.hideLoading();
            console.log('Question Recorder initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('Failed to initialize application: ' + error.message);
        }
    }

    initTheme() {
        document.body.setAttribute('data-color-scheme', this.currentTheme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('qrec-theme', this.currentTheme);
        this.initTheme();
    }

    loadData() {
        try {
            const stored = localStorage.getItem('questionRecorderData');
            if (stored) {
                const parsedData = JSON.parse(stored);
                this.topics = parsedData;
                console.log('Loaded topics from localStorage:', Object.keys(this.topics));
                
                // Ensure all default topics exist
                this.ensureDefaultTopics();
            } else {
                console.log('No stored data found, loading default topics');
                this.loadDefaultTopics();
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.loadDefaultTopics();
        }
    }

    ensureDefaultTopics() {
        let needsUpdate = false;
        for (const [id, topicData] of Object.entries(this.defaultTopicsData)) {
            if (!this.topics[id]) {
                this.topics[id] = {
                    id: id,
                    name: topicData.name,
                    color: topicData.color,
                    questions: topicData.questions.map((q, index) => ({
                        id: Date.now() + index + Math.random(),
                        notes: q.notes,
                        shorthand: q.shorthand || '',
                        image: null,
                        audio: null
                    }))
                };
                needsUpdate = true;
            }
        }
        if (needsUpdate) {
            this.saveData();
        }
    }

    loadDefaultTopics() {
        this.topics = {};
        for (const [id, topicData] of Object.entries(this.defaultTopicsData)) {
            this.topics[id] = {
                id: id,
                name: topicData.name,
                color: topicData.color,
                questions: topicData.questions.map((q, index) => ({
                    id: Date.now() + index + Math.random(),
                    notes: q.notes,
                    shorthand: q.shorthand || '',
                    image: null,
                    audio: null
                }))
            };
        }
        this.saveData();
        console.log('Default topics loaded:', Object.keys(this.topics));
    }

    saveData() {
        try {
            localStorage.setItem('questionRecorderData', JSON.stringify(this.topics));
            console.log('Data saved to localStorage');
        } catch (error) {
            console.error('Error saving data:', error);
            this.showError('Failed to save data: ' + error.message);
        }
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Dashboard events
        document.addEventListener('click', (e) => {
            // Add topic button
            if (e.target && e.target.id === 'addTopicBtn') {
                e.preventDefault();
                this.showAddTopicModal();
                return;
            }

            // Topic card click
            const topicCard = e.target.closest('.topic-card');
            if (topicCard && !e.target.classList.contains('delete-topic')) {
                e.preventDefault();
                const topicId = topicCard.getAttribute('data-topic-id');
                this.openTopic(topicId);
                return;
            }

            // Delete topic button
            if (e.target && e.target.classList.contains('delete-topic')) {
                e.preventDefault();
                e.stopPropagation();
                const topicId = e.target.getAttribute('data-topic-id');
                this.deleteTopic(topicId);
                return;
            }

            // Back button
            if (e.target && e.target.id === 'backBtn') {
                e.preventDefault();
                this.showDashboard();
                return;
            }

            // Save all button
            if (e.target && e.target.id === 'saveAllBtn') {
                e.preventDefault();
                this.saveAllQuestions();
                return;
            }

            // Modal close buttons
            if (e.target && e.target.classList.contains('modal-close')) {
                e.preventDefault();
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.hideModal(modal.id);
                }
                return;
            }

            // Flash card actions
            if (e.target && e.target.hasAttribute('data-edit-index')) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(e.target.getAttribute('data-edit-index'));
                this.editQuestion(index);
                return;
            }

            if (e.target && e.target.hasAttribute('data-delete-index')) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(e.target.getAttribute('data-delete-index'));
                this.deleteQuestion(index);
                return;
            }

            // Card record buttons
            if (e.target && e.target.hasAttribute('data-record-index')) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(e.target.getAttribute('data-record-index'));
                this.startCardRecording(index);
                return;
            }

            // Card stop buttons
            if (e.target && e.target.hasAttribute('data-stop-index')) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(e.target.getAttribute('data-stop-index'));
                this.stopCardRecording(index);
                return;
            }

            // Card play buttons
            if (e.target && e.target.hasAttribute('data-play-index')) {
                e.preventDefault();
                e.stopPropagation();
                const index = parseInt(e.target.getAttribute('data-play-index'));
                this.playCardAudio(index);
                return;
            }

            // Image modal
            if (e.target && e.target.hasAttribute('data-image-src')) {
                e.preventDefault();
                e.stopPropagation();
                this.showImageModal(e.target.getAttribute('data-image-src'));
                return;
            }
        });

        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'addQuestionForm') {
                e.preventDefault();
                this.addQuestion();
            }
            if (e.target.id === 'addTopicForm') {
                e.preventDefault();
                this.createTopic();
            }
            if (e.target.id === 'editQuestionForm') {
                e.preventDefault();
                this.updateQuestion();
            }
        });

        // Recording controls
        this.setupRecordingControls();
        this.setupModalEvents();
        this.setupGlobalEvents();

        console.log('Event listeners setup complete');
    }

    setupRecordingControls() {
        // Main form recording controls
        const recordBtn = document.getElementById('recordBtn');
        const stopBtn = document.getElementById('stopBtn');
        const playBtn = document.getElementById('playBtn');
        const clearAudioBtn = document.getElementById('clearAudioBtn');

        if (recordBtn) {
            recordBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.startRecording();
            });
        }

        if (stopBtn) {
            stopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.stopRecording();
            });
        }

        if (playBtn) {
            playBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.playRecording();
            });
        }

        if (clearAudioBtn) {
            clearAudioBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearAudio();
            });
        }

        // Edit modal recording controls
        const editRecordBtn = document.getElementById('editRecordBtn');
        const editStopBtn = document.getElementById('editStopBtn');
        const editPlayBtn = document.getElementById('editPlayBtn');
        const editClearAudioBtn = document.getElementById('editClearAudioBtn');

        if (editRecordBtn) {
            editRecordBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.startRecording(true);
            });
        }

        if (editStopBtn) {
            editStopBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.stopRecording(true);
            });
        }

        if (editPlayBtn) {
            editPlayBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.playRecording(true);
            });
        }

        if (editClearAudioBtn) {
            editClearAudioBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearAudio(true);
            });
        }
    }

    setupModalEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') && !e.target.classList.contains('hidden')) {
                this.hideModal(e.target.id);
            }
        });

        const cancelButtons = ['cancelAddTopic', 'cancelEditQuestion'];
        cancelButtons.forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const modal = e.target.closest('.modal');
                    if (modal) {
                        this.hideModal(modal.id);
                    }
                });
            }
        });
    }

    setupGlobalEvents() {
        window.addEventListener('beforeunload', () => {
            this.saveData();
        });

        setInterval(() => {
            if (this.currentTopic) {
                this.saveData();
            }
        }, 30000);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal:not(.hidden)');
                openModals.forEach(modal => {
                    this.hideModal(modal.id);
                });
            }
        });
    }

    renderDashboard() {
        console.log('Rendering dashboard...');
        const grid = document.getElementById('topicsGrid');
        if (!grid) {
            console.error('Topics grid not found');
            return;
        }

        grid.innerHTML = '';
        const topicEntries = Object.entries(this.topics);

        if (topicEntries.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No Topics Yet</h3>
                    <p>Create your first topic to start organizing your study materials with flash cards.</p>
                </div>
            `;
            return;
        }

        topicEntries.forEach(([id, topic]) => {
            const questionCount = topic.questions ? topic.questions.length : 0;
            const audioCount = topic.questions ? topic.questions.filter(q => q.audio).length : 0;
            const imageCount = topic.questions ? topic.questions.filter(q => q.image).length : 0;
            
            const card = document.createElement('div');
            card.className = `topic-card ${topic.color || 'bg-default'}`;
            card.setAttribute('data-topic-id', id);
            
            card.innerHTML = `
                <button class="delete-topic" data-topic-id="${id}" title="Delete Topic">×</button>
                <h3>${topic.name}</h3>
                <div class="topic-stats">
                    <div class="stat">
                        <span class="stat-number">${questionCount}</span>
                        <span class="stat-label">Questions</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${audioCount}</span>
                        <span class="stat-label">Audio</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${imageCount}</span>
                        <span class="stat-label">Images</span>
                    </div>
                </div>
                <div class="topic-card-footer">
                    <span class="topic-progress">Click to study →</span>
                </div>
            `;
            
            grid.appendChild(card);
        });

        // Show dashboard
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('topicView').classList.add('hidden');
    }

    renderFlashCards() {
        const grid = document.getElementById('flashCardsGrid');
        if (!grid || !this.currentTopic) return;

        grid.innerHTML = '';
        const topic = this.topics[this.currentTopic];
        
        if (!topic || !topic.questions || topic.questions.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No Flash Cards Yet</h3>
                    <p>Add your first flash card using the form above.</p>
                </div>
            `;
            return;
        }

        topic.questions.forEach((question, index) => {
            const card = document.createElement('div');
            card.className = 'flash-card-enhanced';
            
            card.innerHTML = `
                <div class="flash-card-header">
                    <span class="question-number">Q${index + 1}</span>
                    <div class="flash-card-actions">
                        <button class="card-action" data-edit-index="${index}" title="Edit">✏️</button>
                        <button class="card-action card-action--delete" data-delete-index="${index}" title="Delete">🗑️</button>
                    </div>
                </div>

                <div class="flash-card-content">
                    ${question.image ? `
                        <div class="flash-card-image-container">
                            <img src="${question.image}" class="flash-card-image" data-image-src="${question.image}" alt="Question Image">
                        </div>
                    ` : ''}
                    
                    ${question.shorthand ? `
                        <div class="flash-card-shorthand">${question.shorthand}</div>
                    ` : ''}
                    
                    ${question.notes ? `
                        <div class="flash-card-notes">${question.notes}</div>
                    ` : ''}
                    
                    <div class="flash-card-audio-section">
                        <div class="audio-player">
                            <button class="audio-btn record-btn" data-record-index="${index}" ${this.isRecording(index) ? 'disabled' : ''}>
                                🎤 ${this.isRecording(index) ? 'Recording...' : 'Record'}
                            </button>
                            <button class="audio-btn stop-btn" data-stop-index="${index}" ${!this.isRecording(index) ? 'disabled' : ''}>
                                ⏹ Stop
                            </button>
                            <button class="audio-btn play-btn" data-play-index="${index}" ${!question.audio ? 'disabled' : ''}>
                                ▶ Play
                            </button>
                            ${question.audio ? '<span class="audio-indicator">🎵</span>' : ''}
                        </div>
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    openTopic(topicId) {
        console.log('Opening topic:', topicId);
        this.currentTopic = topicId;
        const topic = this.topics[topicId];
        
        if (!topic) {
            console.error('Topic not found:', topicId);
            return;
        }

        // Update topic title
        const titleElement = document.getElementById('topicTitle');
        if (titleElement) {
            titleElement.textContent = topic.name;
        }

        // Render flash cards
        this.renderFlashCards();

        // Show topic view
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('topicView').classList.remove('hidden');
    }

    showDashboard() {
        this.currentTopic = null;
        this.renderDashboard();
    }

    showAddTopicModal() {
        const modal = document.getElementById('addTopicModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.getElementById('topicName').focus();
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    createTopic() {
        const nameInput = document.getElementById('topicName');
        const name = nameInput.value.trim();
        
        if (!name) {
            this.showError('Please enter a topic name');
            return;
        }

        const id = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        
        if (this.topics[id]) {
            this.showError('Topic already exists');
            return;
        }

        this.topics[id] = {
            id: id,
            name: name,
            color: 'bg-default',
            questions: this.defaultQuestionTemplate.map((q, index) => ({
                id: Date.now() + index + Math.random(),
                notes: q.notes,
                shorthand: q.shorthand,
                image: null,
                audio: null
            }))
        };

        this.saveData();
        this.hideModal('addTopicModal');
        nameInput.value = '';
        this.renderDashboard();
        this.showSuccess('Topic created successfully!');
    }

    deleteTopic(topicId) {
        if (confirm('Are you sure you want to delete this topic? This action cannot be undone.')) {
            delete this.topics[topicId];
            this.saveData();
            this.renderDashboard();
            this.showSuccess('Topic deleted successfully!');
        }
    }

    addQuestion() {
        if (!this.currentTopic) return;

        const notesInput = document.getElementById('questionNotes');
        const shorthandInput = document.getElementById('questionShorthand');
        const imageInput = document.getElementById('questionImage');

        const notes = notesInput.value.trim();
        const shorthand = shorthandInput.value.trim();
        
        // At least one field must be filled
        if (!notes && !shorthand && !imageInput.files[0] && !this.currentRecording) {
            this.showError('Please fill at least one field (notes, shorthand, image, or audio)');
            return;
        }

        const question = {
            id: Date.now() + Math.random(),
            notes: notes,
            shorthand: shorthand,
            image: null,
            audio: this.currentRecording
        };

        // Handle image upload
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                question.image = e.target.result;
                this.addQuestionToTopic(question);
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            this.addQuestionToTopic(question);
        }
    }

    addQuestionToTopic(question) {
        if (!this.topics[this.currentTopic]) {
            this.topics[this.currentTopic] = { questions: [] };
        }
        if (!this.topics[this.currentTopic].questions) {
            this.topics[this.currentTopic].questions = [];
        }

        this.topics[this.currentTopic].questions.push(question);
        this.saveData();
        
        // Clear form
        document.getElementById('questionNotes').value = '';
        document.getElementById('questionShorthand').value = '';
        document.getElementById('questionImage').value = '';
        this.clearAudio();
        
        this.renderFlashCards();
        this.showSuccess('Flash card added successfully!');
    }

    editQuestion(index) {
        if (!this.currentTopic || !this.topics[this.currentTopic].questions[index]) return;

        this.editingQuestionIndex = index;
        const question = this.topics[this.currentTopic].questions[index];

        document.getElementById('editQuestionNotes').value = question.notes || '';
        document.getElementById('editQuestionShorthand').value = question.shorthand || '';
        
        // Clear previous audio in edit modal
        this.clearAudio(true);
        
        // If question has audio, enable play button
        const editPlayBtn = document.getElementById('editPlayBtn');
        const editClearAudioBtn = document.getElementById('editClearAudioBtn');
        if (editPlayBtn && editClearAudioBtn) {
            if (question.audio) {
                editPlayBtn.disabled = false;
                editClearAudioBtn.disabled = false;
            } else {
                editPlayBtn.disabled = true;
                editClearAudioBtn.disabled = true;
            }
        }

        document.getElementById('editQuestionModal').classList.remove('hidden');
    }

    updateQuestion() {
        if (!this.currentTopic || this.editingQuestionIndex === null) return;

        const question = this.topics[this.currentTopic].questions[this.editingQuestionIndex];
        const notes = document.getElementById('editQuestionNotes').value.trim();
        const shorthand = document.getElementById('editQuestionShorthand').value.trim();
        const imageInput = document.getElementById('editQuestionImage');

        question.notes = notes;
        question.shorthand = shorthand;

        // Update audio if new recording was made
        if (this.currentRecording) {
            question.audio = this.currentRecording;
        }

        // Handle image upload
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                question.image = e.target.result;
                this.completeUpdate();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            this.completeUpdate();
        }
    }

    completeUpdate() {
        this.saveData();
        this.hideModal('editQuestionModal');
        this.renderFlashCards();
        this.editingQuestionIndex = null;
        this.clearAudio(true);
        this.showSuccess('Flash card updated successfully!');
    }

    deleteQuestion(index) {
        if (!this.currentTopic || !this.topics[this.currentTopic].questions[index]) return;

        if (confirm('Are you sure you want to delete this flash card?')) {
            this.topics[this.currentTopic].questions.splice(index, 1);
            this.saveData();
            this.renderFlashCards();
            this.showSuccess('Flash card deleted successfully!');
        }
    }

    // Audio recording methods
    async startRecording(isEdit = false) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const reader = new FileReader();
                reader.onload = () => {
                    this.currentRecording = reader.result;
                    this.updateAudioControls(isEdit);
                };
                reader.readAsDataURL(audioBlob);
                
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.updateRecordingState(isEdit, true);
        } catch (error) {
            console.error('Error starting recording:', error);
            this.showError('Failed to start recording. Please check microphone permissions.');
        }
    }

    stopRecording(isEdit = false) {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            this.updateRecordingState(isEdit, false);
        }
    }

    playRecording(isEdit = false) {
        const audioData = this.currentRecording || (this.editingQuestionIndex !== null && this.topics[this.currentTopic].questions[this.editingQuestionIndex].audio);
        if (audioData) {
            const audio = new Audio(audioData);
            audio.play().catch(error => {
                console.error('Error playing audio:', error);
                this.showError('Failed to play audio');
            });
        }
    }

    clearAudio(isEdit = false) {
        this.currentRecording = null;
        this.updateAudioControls(isEdit);
    }

    updateRecordingState(isEdit, isRecording) {
        const prefix = isEdit ? 'edit' : '';
        const recordBtn = document.getElementById(`${prefix}RecordBtn`);
        const stopBtn = document.getElementById(`${prefix}StopBtn`);
        const status = document.getElementById(`${prefix === 'edit' ? 'editRecordingStatus' : 'recordingStatus'}`);

        if (recordBtn) recordBtn.disabled = isRecording;
        if (stopBtn) stopBtn.disabled = !isRecording;
        if (status) status.textContent = isRecording ? 'Recording...' : '';
    }

    updateAudioControls(isEdit) {
        const prefix = isEdit ? 'edit' : '';
        const playBtn = document.getElementById(`${prefix}PlayBtn`);
        const clearBtn = document.getElementById(`${prefix}ClearAudioBtn`);

        if (playBtn) playBtn.disabled = !this.currentRecording;
        if (clearBtn) clearBtn.disabled = !this.currentRecording;
    }

    // Card-specific audio methods
    async startCardRecording(index) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const reader = new FileReader();
                reader.onload = () => {
                    if (this.topics[this.currentTopic] && this.topics[this.currentTopic].questions[index]) {
                        this.topics[this.currentTopic].questions[index].audio = reader.result;
                        this.saveData();
                        this.renderFlashCards();
                    }
                };
                reader.readAsDataURL(audioBlob);
                
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.renderFlashCards(); // Re-render to show recording state
        } catch (error) {
            console.error('Error starting card recording:', error);
            this.showError('Failed to start recording. Please check microphone permissions.');
        }
    }

    stopCardRecording(index) {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }
    }

    playCardAudio(index) {
        if (this.topics[this.currentTopic] && this.topics[this.currentTopic].questions[index] && this.topics[this.currentTopic].questions[index].audio) {
            const audio = new Audio(this.topics[this.currentTopic].questions[index].audio);
            audio.play().catch(error => {
                console.error('Error playing card audio:', error);
                this.showError('Failed to play audio');
            });
        }
    }

    isRecording(index) {
        return this.mediaRecorder && this.mediaRecorder.state === 'recording';
    }

    showImageModal(imageSrc) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        if (modal && modalImage) {
            modalImage.src = imageSrc;
            modal.classList.remove('hidden');
        }
    }

    saveAllQuestions() {
        this.saveData();
        this.showSuccess('All questions saved successfully!');
        
        // Add visual feedback
        const saveBtn = document.getElementById('saveAllBtn');
        if (saveBtn) {
            saveBtn.classList.add('save-success');
            setTimeout(() => {
                saveBtn.classList.remove('save-success');
            }, 800);
        }
    }

    showLoading() {
        const loading = document.getElementById('loadingIndicator');
        if (loading) loading.classList.remove('hidden');
    }

    hideLoading() {
        const loading = document.getElementById('loadingIndicator');
        if (loading) loading.classList.add('hidden');
    }

    showSuccess(message) {
        const notification = document.getElementById('successNotification');
        if (notification) {
            notification.querySelector('span').textContent = message;
            notification.classList.remove('hidden');
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
        }
    }

    showError(message) {
        alert(message); // Simple error display - could be enhanced with a proper error modal
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new QuestionRecorder();
    app.init();
});