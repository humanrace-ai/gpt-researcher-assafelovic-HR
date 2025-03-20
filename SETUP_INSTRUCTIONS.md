# GPT Researcher Application Setup Instructions

**Initial Setup (One-time):**

1.  **Install Python 3.11 or later:** Follow the guide at [https://www.tutorialsteacher.com/python/install-python](https://www.tutorialsteacher.com/python/install-python) to install Python 3.11 or a newer version. On macOS, consider using Homebrew to install Python 3 (`brew install python3`).
2.  **Install Git (if not already installed):** Ensure Git is installed on your system. You can check by running `git --version` in the terminal. If not installed, follow the instructions for your operating system.
3.  **Clone the repository:** In your terminal, navigate to your desired project directory and clone the GPT Researcher repository from GitHub:

    ```bash
    git clone https://github.com/humanrace-ai/gpt-researcher-assafelovic-HR.git
    cd gpt-researcher-assafelovic-HR
    ```

4.  **Create a local `.env` file:** Copy the `.env.example` file to `.env` in the project root directory:

    ```bash
    cp .env.example .env
    ```

5.  **Populate `.env` with API keys:** Open the `.env` file in a text editor and add your OpenAI and Tavily API keys as instructed in the file.

6.  **Create a virtual environment:** To isolate project dependencies, create a virtual environment. It's recommended to create it outside the project directory to avoid potential issues with project files. For example, in your home directory:

    ```bash
    python3 -m venv ~/test_venv
    ```

7.  **Activate the virtual environment:** Activate the newly created virtual environment. 
    - On macOS and Linux:

      ```bash
      source ~/test_venv/bin/activate
      ```
    - On Windows:

      ```bash
      .venv\Scripts\activate
      ```

    (Ensure your terminal prompt shows the virtual environment name, e.g., `(test_venv)`)

8.  **Install dependencies:** With the virtual environment activated, install the required Python packages using pip:

    ```bash
    pip3 install -r requirements.txt
    ```

**Starting the application (After initial setup):**

1.  **Activate the virtual environment:** If you closed the terminal or deactivated the virtual environment, navigate to your project directory in the terminal and activate the virtual environment again:

    ```bash
    source ~/test_venv/bin/activate 
    ```
    (or the appropriate activation command for your OS and virtual environment location)

2.  **Start the server:** Run the server startup command from the project root directory:

    ```bash
    python3 -m uvicorn main:app --reload
    ```

3.  **Access the application:** Once the server starts successfully, open your web browser and go to [http://localhost:8000](http://localhost:8000) (or the address shown in the terminal output) to access the GPT Researcher frontend.

**Note:** 
- If you encounter issues with dependency installation, ensure you are running `pip3 install -r requirements.txt` with the virtual environment activated.
- If you still see "Ignoring invalid distribution" warnings during dependency installation, they might be non-fatal warnings and the installation might still succeed. Check for "Successfully installed..." messages and error codes.
- If the server fails to start with "ModuleNotFoundError", it indicates that dependencies are not correctly installed. Double-check the virtual environment activation and dependency installation steps.