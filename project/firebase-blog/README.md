# Firebase Blog Project

This project is a simple blog application that retrieves blog posts from a Firebase database. It demonstrates how to integrate Firebase with a TypeScript application and manage blog posts effectively.

## Project Structure

```
firebase-blog
├── src
│   ├── config
│   │   └── firebase.ts        # Initializes Firebase app and exports database instance
│   ├── lib
│   │   └── data
│   │       └── blog-posts.ts  # Exports BlogPost interface and retrieves posts from Firebase
│   ├── types
│   │   └── blog.ts            # Defines the structure of a blog post
│   └── utils
│       └── db-helpers.ts      # Utility functions for interacting with Firebase
├── .env                        # Environment variables for Firebase configuration
├── package.json                # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                   # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd firebase-blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration settings and add them to the `.env` file.

4. **Run the application:**
   ```bash
   npm start
   ```

## Usage

- The application retrieves blog posts from the Firebase database and displays them on the front end.
- You can add, update, or delete blog posts using the provided utility functions in `db-helpers.ts`.

## License

This project is licensed under the MIT License.