// Application State Management
class QRecApp {
    constructor() {
        this.currentView = 'dashboard';
        this.currentTopic = null;
        this.data = this.loadData();
        this.theme = localStorage.getItem('qrec-theme') || 'dark';
        this.init();
    }

    init() {
        this.initTheme();
        this.bindEvents();
        this.renderDashboard();
    }

    initTheme() {
        document.documentElement.setAttribute('data-color-scheme', this.theme);
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
    }

    loadData() {
        const stored = localStorage.getItem('qrec-data');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // Initialize with default data
        const defaultData = {
            "dm": {
                "id": "dm",
                "name": "Discrete Mathematics",
                "color": "#8B5CF6",
                "questions": [
                    {"id": this.generateId(), "shorthand": "Set Theory", "notes": "Basic concepts of sets, unions, intersections", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Relations & Functions", "notes": "Types of relations and function properties", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Graph Theory", "notes": "Vertices, edges, paths, and graph algorithms", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Logic & Proofs", "notes": "Propositional logic and proof techniques", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Combinatorics", "notes": "Counting principles and permutations", "audio": null, "audioDuration": 0}
                ]
            },
            "em": {
                "id": "em", 
                "name": "Engineering Mathematics",
                "color": "#3B82F6",
                "questions": [
                    {"id": this.generateId(), "shorthand": "Linear Algebra", "notes": "Matrices, determinants, eigenvalues", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Calculus", "notes": "Limits, derivatives, and integrals", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Differential Equations", "notes": "ODE and PDE solving techniques", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Probability & Statistics", "notes": "Distributions and statistical inference", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Complex Analysis", "notes": "Complex functions and contour integration", "audio": null, "audioDuration": 0}
                ]
            },
            "toc": {
                "id": "toc",
                "name": "Theory of Computation", 
                "color": "#10B981",
                "questions": [
                    {"id": this.generateId(), "shorthand": "Finite Automata", "notes": "DFA, NFA, and regular languages", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Context-Free Grammar", "notes": "CFG, PDA, and parsing techniques", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Turing Machine", "notes": "TM models and computability", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Decidability", "notes": "Decidable and undecidable problems", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Complexity Classes", "notes": "P, NP, and complexity theory", "audio": null, "audioDuration": 0}
                ]
            },
            "cd": {
                "id": "cd",
                "name": "Compiler Design",
                "color": "#F97316", 
                "questions": [
                    {"id": this.generateId(), "shorthand": "Lexical Analysis", "notes": "Tokenization and lexer design", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Syntax Analysis", "notes": "Parsing and syntax trees", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Semantic Analysis", "notes": "Type checking and symbol tables", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Code Generation", "notes": "Intermediate and target code generation", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Code Optimization", "notes": "Optimization techniques and algorithms", "audio": null, "audioDuration": 0}
                ]
            },
            "coa": {
                "id": "coa",
                "name": "Computer Organization",
                "color": "#14B8A6",
                "questions": [
                    {"id": this.generateId(), "shorthand": "Instruction Set Architecture", "notes": "RISC vs CISC, instruction formats", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "CPU Design & Control", "notes": "Control unit and datapath design", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Memory Hierarchy", "notes": "Cache, main memory, virtual memory", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "I/O Systems", "notes": "Input/output interfaces and DMA", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Pipeline & Hazards", "notes": "Pipelining and hazard resolution", "audio": null, "audioDuration": 0}
                ]
            },
            "os": {
                "id": "os",
                "name": "Operating Systems",
                "color": "#EF4444",
                "questions": [
                    {"id": this.generateId(), "shorthand": "Process Management", "notes": "Process states, scheduling algorithms", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Memory Management", "notes": "Paging, segmentation, virtual memory", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "File Systems", "notes": "File allocation and directory structures", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Synchronization", "notes": "Semaphores, monitors, critical sections", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Deadlock Prevention", "notes": "Deadlock detection and prevention", "audio": null, "audioDuration": 0}
                ]
            },
            "cn": {
                "id": "cn", 
                "name": "Computer Networks",
                "color": "#6366F1",
                "questions": [
                    {"id": this.generateId(), "shorthand": "OSI & TCP/IP Model", "notes": "Network protocol stack layers", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "TCP/UDP Protocols", "notes": "Reliable vs unreliable transport", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Routing Algorithms", "notes": "Distance vector and link state", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Network Security", "notes": "Encryption, authentication, firewalls", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Error Detection & Correction", "notes": "CRC, hamming codes, ARQ", "audio": null, "audioDuration": 0}
                ]
            },
            "ds": {
                "id": "ds",
                "name": "Data Structures", 
                "color": "#EC4899",
                "questions": [
                    {"id": this.generateId(), "shorthand": "Arrays & Linked Lists", "notes": "Linear data structure operations", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Stacks & Queues", "notes": "LIFO and FIFO data structures", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Trees & BST", "notes": "Binary trees and search operations", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Graphs & Traversal", "notes": "Graph representation and traversal", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Hash Tables", "notes": "Hashing techniques and collision resolution", "audio": null, "audioDuration": 0}
                ]
            },
            "algo": {
                "id": "algo",
                "name": "Algorithms",
                "color": "#EAB308", 
                "questions": [
                    {"id": this.generateId(), "shorthand": "Sorting Algorithms", "notes": "Comparison and non-comparison sorts", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Divide & Conquer", "notes": "Recursive algorithm design", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Dynamic Programming", "notes": "Optimal substructure problems", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Greedy Algorithms", "notes": "Local optimization strategies", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Graph Algorithms", "notes": "Shortest path and spanning tree", "audio": null, "audioDuration": 0}
                ]
            },
            "dbms": {
                "id": "dbms",
                "name": "Database Management",
                "color": "#06B6D4",
                "questions": [
                    {"id": this.generateId(), "shorthand": "ER Diagrams & Modeling", "notes": "Entity-relationship design", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Normalization", "notes": "Normal forms and dependency theory", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "SQL Queries & Joins", "notes": "Complex query writing", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Transactions & ACID", "notes": "Transaction properties and control", "audio": null, "audioDuration": 0},
                    {"id": this.generateId(), "shorthand": "Indexing & Query Optimization", "notes": "Performance optimization techniques", "audio": null, "audioDuration": 0}
                ]
            }
        };
        
        this.saveData(defaultData);
        return defaultData;
    }

    saveData(data = this.data) {
        localStorage.setItem('qrec-data', JSON.stringify(data));
        this.data = data;
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    bindEvents() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('qrec-theme', this.theme);
            this.initTheme();
        });

        // Back button - Fixed navigation
        document.getElementById('back-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.showDashboard();
        });

        // Add question form
        document.getElementById('add-question-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addQuestion();
        });
    }

    showDashboard() {
        this.currentView = 'dashboard';
        this.currentTopic = null;
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('topic-view').classList.add('hidden');
        this.renderDashboard();
    }

    showTopic(topicId) {
        this.currentView = 'topic';
        this.currentTopic = topicId;
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('topic-view').classList.remove('hidden');
        this.renderTopicView();
    }

    renderDashboard() {
        const grid = document.getElementById('topics-grid');
        grid.innerHTML = '';

        Object.values(this.data).forEach(topic => {
            const audioCount = topic.questions.filter(q => q.audio).length;
            const card = document.createElement('div');
            card.className = 'topic-card';
            card.setAttribute('data-topic', topic.id);
            card.innerHTML = `
                <div class="topic-info">
                    <div class="topic-code">${topic.id.toUpperCase()}</div>
                    <h3>${topic.name}</h3>
                    <div class="topic-stats">
                        <div class="stat">
                            <div class="stat-number">${topic.questions.length}</div>
                            <div class="stat-label">Questions</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">${audioCount}</div>
                            <div class="stat-label">Recorded</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Fixed: Ensure click event is properly bound to navigate to topic
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showTopic(topic.id);
            });
            
            grid.appendChild(card);
        });
    }

    renderTopicView() {
        const topic = this.data[this.currentTopic];
        if (!topic) {
            this.showDashboard();
            return;
        }
        
        document.getElementById('topic-title').textContent = topic.name;
        document.getElementById('topic-subtitle').textContent = `${topic.questions.length} questions`;
        
        // Clear and reset the form
        document.getElementById('add-question-form').reset();
        
        this.renderQuestions();
    }

    renderQuestions() {
        const grid = document.getElementById('questions-grid');
        const topic = this.data[this.currentTopic];
        grid.innerHTML = '';

        if (!topic || !topic.questions) {
            return;
        }

        topic.questions.forEach((question, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.setAttribute('data-topic', this.currentTopic);
            card.innerHTML = `
                <div class="question-header">
                    <div class="question-number">${index + 1}</div>
                    <div class="question-content">
                        <div class="question-shorthand">${question.shorthand || 'Untitled Question'}</div>
                        <textarea class="question-notes" placeholder="Add your notes here...">${question.notes || ''}</textarea>
                    </div>
                </div>
                <div class="audio-player-wrapper"></div>
                <div class="question-actions">
                    <button class="btn btn--outline btn--sm delete-question" data-id="${question.id}">Delete</button>
                </div>
            `;

            // Add audio player
            const audioWrapper = card.querySelector('.audio-player-wrapper');
            const audioPlayer = new AudioPlayer(question, this.currentTopic, (updatedQuestion) => {
                question.audio = updatedQuestion.audio;
                question.audioDuration = updatedQuestion.audioDuration;
                this.saveData();
                this.renderDashboard(); // Update stats on dashboard
            });
            audioWrapper.appendChild(audioPlayer.element);

            // Bind events
            const notesTextarea = card.querySelector('.question-notes');
            notesTextarea.addEventListener('blur', () => {
                question.notes = notesTextarea.value;
                this.saveData();
            });

            const deleteBtn = card.querySelector('.delete-question');
            deleteBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this question?')) {
                    this.deleteQuestion(question.id);
                }
            });

            grid.appendChild(card);
        });
    }

    addQuestion() {
        const shorthandInput = document.getElementById('shorthand');
        const notesInput = document.getElementById('notes');
        
        const shorthand = shorthandInput.value.trim();
        const notes = notesInput.value.trim();

        if (!shorthand) {
            shorthandInput.focus();
            return;
        }

        const newQuestion = {
            id: this.generateId(),
            shorthand,
            notes: notes || '',
            audio: null,
            audioDuration: 0
        };

        this.data[this.currentTopic].questions.push(newQuestion);
        this.saveData();
        
        // Clear form
        shorthandInput.value = '';
        notesInput.value = '';
        
        this.renderQuestions();
    }

    deleteQuestion(questionId) {
        const topic = this.data[this.currentTopic];
        topic.questions = topic.questions.filter(q => q.id !== questionId);
        this.saveData();
        this.renderQuestions();
    }
}

// Professional Audio Player Class
class AudioPlayer {
    constructor(question, topicId, onUpdate) {
        this.question = question;
        this.topicId = topicId;
        this.onUpdate = onUpdate;
        this.isRecording = false;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.playbackRate = 1;
        this.volume = 1;
        this.isMuted = false;
        
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.recordingStartTime = 0;
        this.recordingTimer = null;
        this.visualizationFrame = null;
        
        this.createElement();
        this.bindEvents();
        
        if (question.audio) {
            this.loadAudio();
        }
    }

    createElement() {
        const template = document.getElementById('audio-player-template');
        this.element = template.content.cloneNode(true).firstElementChild;
        
        // Get references to elements
        this.recordingSection = this.element.querySelector('.recording-section');
        this.playbackSection = this.element.querySelector('.playback-section');
        this.recordButton = this.element.querySelector('.btn-record');
        this.stopRecordButton = this.element.querySelector('.btn-stop-record');
        this.playPauseButton = this.element.querySelector('.btn-play-pause');
        this.stopButton = this.element.querySelector('.btn-stop');
        this.progressBar = this.element.querySelector('.progress-bar');
        this.progressFill = this.element.querySelector('.progress-fill');
        this.currentTimeSpan = this.element.querySelector('.current-time');
        this.totalTimeSpan = this.element.querySelector('.total-time');
        this.timerText = this.element.querySelector('.timer-text');
        this.canvas = this.element.querySelector('.frequency-canvas');
        this.audioElement = this.element.querySelector('.audio-element');
        this.speedButtons = this.element.querySelectorAll('.speed-btn');
        this.volumeButton = this.element.querySelector('.btn-volume');
        
        this.ctx = this.canvas.getContext('2d');
    }

    bindEvents() {
        this.recordButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleRecording();
        });
        
        this.stopRecordButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.stopRecording();
        });
        
        this.playPauseButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.togglePlayback();
        });
        
        this.stopButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.stopPlayback();
        });
        
        this.progressBar.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.seek(e);
        });
        
        this.volumeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMute();
        });
        
        this.speedButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.setPlaybackRate(parseFloat(btn.dataset.speed));
            });
        });

        this.audioElement.addEventListener('loadedmetadata', () => {
            this.duration = this.audioElement.duration;
            this.updateTimeDisplay();
        });

        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
            this.updateProgress();
        });

        this.audioElement.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updatePlayButton();
            this.currentTime = 0;
            this.updateProgress();
        });
    }

    async toggleRecording() {
        if (!this.isRecording) {
            await this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
            
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            const source = this.audioContext.createMediaStreamSource(stream);
            source.connect(this.analyser);
            
            this.analyser.fftSize = 256;
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });
            this.audioChunks = [];
            
            this.mediaRecorder.addEventListener('dataavailable', event => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            });
            
            this.mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm;codecs=opus' });
                const audioUrl = URL.createObjectURL(audioBlob);
                this.question.audio = audioUrl;
                this.question.audioDuration = (Date.now() - this.recordingStartTime) / 1000;
                this.onUpdate(this.question);
                this.loadAudio();
                stream.getTracks().forEach(track => track.stop());
                
                if (this.audioContext) {
                    this.audioContext.close();
                }
            });
            
            this.isRecording = true;
            this.recordingStartTime = Date.now();
            this.mediaRecorder.start(100);
            
            this.showRecordingUI();
            this.startVisualization();
            this.startRecordingTimer();
            
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Could not access microphone. Please check permissions and try again.');
        }
    }

    stopRecording() {
        if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.hideRecordingUI();
            
            if (this.recordingTimer) {
                clearInterval(this.recordingTimer);
            }
            
            if (this.visualizationFrame) {
                cancelAnimationFrame(this.visualizationFrame);
            }
        }
    }

    loadAudio() {
        if (this.question.audio) {
            this.audioElement.src = this.question.audio;
            this.duration = this.question.audioDuration || 0;
            this.updateTimeDisplay();
        }
    }

    togglePlayback() {
        if (!this.question.audio) return;
        
        if (this.isPlaying) {
            this.audioElement.pause();
            this.isPlaying = false;
        } else {
            this.audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
            });
            this.isPlaying = true;
        }
        this.updatePlayButton();
    }

    stopPlayback() {
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayButton();
        this.updateProgress();
    }

    seek(event) {
        if (!this.question.audio) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const newTime = percent * this.duration;
        
        this.audioElement.currentTime = newTime;
        this.currentTime = newTime;
        this.updateProgress();
    }

    setPlaybackRate(rate) {
        this.playbackRate = rate;
        if (this.audioElement) {
            this.audioElement.playbackRate = rate;
        }
        
        this.speedButtons.forEach(btn => {
            btn.classList.toggle('active', parseFloat(btn.dataset.speed) === rate);
        });
    }

    toggleMute() {
        if (!this.isMuted) {
            this.audioElement.volume = 0;
            this.volumeButton.querySelector('.volume-icon').textContent = '🔇';
            this.isMuted = true;
        } else {
            this.audioElement.volume = this.volume;
            this.volumeButton.querySelector('.volume-icon').textContent = '🔊';
            this.isMuted = false;
        }
    }

    showRecordingUI() {
        this.recordingSection.classList.remove('hidden');
        this.recordButton.classList.add('recording');
        this.recordButton.querySelector('.record-text').textContent = 'Recording...';
    }

    hideRecordingUI() {
        this.recordingSection.classList.add('hidden');
        this.recordButton.classList.remove('recording');
        this.recordButton.querySelector('.record-text').textContent = 'Record';
    }

    updatePlayButton() {
        const icon = this.playPauseButton.querySelector('.play-icon');
        icon.textContent = this.isPlaying ? '⏸️' : '▶️';
    }

    updateProgress() {
        if (this.duration > 0) {
            const percent = (this.currentTime / this.duration) * 100;
            this.progressFill.style.width = `${percent}%`;
        }
        this.updateTimeDisplay();
    }

    updateTimeDisplay() {
        this.currentTimeSpan.textContent = this.formatTime(this.currentTime);
        this.totalTimeSpan.textContent = this.formatTime(this.duration);
    }

    startRecordingTimer() {
        this.recordingTimer = setInterval(() => {
            if (this.isRecording) {
                const elapsed = (Date.now() - this.recordingStartTime) / 1000;
                this.timerText.textContent = this.formatTime(elapsed);
            }
        }, 100);
    }

    startVisualization() {
        const draw = () => {
            if (!this.isRecording) {
                return;
            }
            
            this.analyser.getByteFrequencyData(this.dataArray);
            
            this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim();
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            const barWidth = this.canvas.width / this.dataArray.length * 2.5;
            let x = 0;
            
            for (let i = 0; i < this.dataArray.length; i++) {
                const barHeight = (this.dataArray[i] / 255) * this.canvas.height * 0.8;
                
                // Use primary color for visualization
                const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
                this.ctx.fillStyle = primaryColor;
                this.ctx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
            
            this.visualizationFrame = requestAnimationFrame(draw);
        };
        
        draw();
    }

    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) seconds = 0;
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.qrecApp = new QRecApp();
});