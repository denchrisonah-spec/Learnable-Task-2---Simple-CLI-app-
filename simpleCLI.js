// readline
// fs

// const readline = require('readline');
// const fs = require('fs');
// try {
//
// }catch (err) { }

import readline from "readline";
import fs from "fs";

const storageFile = "myBlogPosts.json";

const fetchEntries = () => {
    try {
        if (fs.existsSync(storageFile)) {
            const fileData = fs.readFileSync(storageFile, "utf-8");
            return JSON.parse(fileData || "[]");
        }
    } catch (errorObj) {
        console.error("Error reading blog posts:", errorObj);
    }
    return [];
};

const storeEntries = (entriesArray) => {
    fs.writeFileSync(storageFile, JSON.stringify(entriesArray, null, 2), "utf-8");
};

let allEntries = fetchEntries();

const inputReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const processUserChoice = (selectedOption) => {
    switch (selectedOption) {
        case "1":
            createNewEntry();
            break;
        case "2":
            displayAllEntries();
            break;

        case "3":
            updateExistingEntry();
            break;
        case "4":
            removeEntry();
            break;
        case "5":
            console.log("Exiting...");
            inputReader.close();
            break;
        default:
            console.log("Invalid option. Please try again.");
            showMainMenu();
    }
};

const showMainMenu = () => {
    console.log(`
Welcome to the Blog Management System!
Please choose an option:
1. Create a new blog post
2. View blog posts
3. Edit blog posts
4. Delete blog posts
5. Exit

        `);
    inputReader.question(
        "Choose an option fron the list of options above (1-5): ",
        (selectedOption) => {
            processUserChoice(selectedOption);
        },
    );
};

const createNewEntry = () => {
    inputReader.question("Enter the title of your blog post: ", (entryTitle) => {
        inputReader.question("Enter the content of your blog post: ", (entryContent) => {
            const creationDate = new Date().toLocaleString();
            allEntries.push({ title: entryTitle, content: entryContent, createdAt: creationDate });
            storeEntries(allEntries);
            console.log("Blog post created successfully!");
            showMainMenu();
        });
    });
};

const displayAllEntries = () => {
    allEntries = fetchEntries();
    console.log("\nMy Blog Posts:");
    if (allEntries.length === 0) {
        console.log(
            "\nAlert: No blog posts found. Please create a new blog post to view it here.",
        );
    } else {
        allEntries.forEach((entry, idx) => {
            console.log(`\nPost ${idx + 1}:`);
            console.log(`Title: ${entry.title}`);
            console.log(`Content: ${entry.content}`);
            console.log(`Created At: ${entry.createdAt}`);
        });
    }
    showMainMenu();
};

const updateExistingEntry = () => {
    if (allEntries.length === 0) {
        console.log(
            "\nAlert: No blog posts found. Please create a new blog post to edit it here.",
        );
        return showMainMenu();
    }

    inputReader.question(
        "Enter the number of the blog post you want to edit: ",
        (inputNumber) => {
            const itemIndex = parseInt(inputNumber, 10) - 1;
            // change the number to an integer and subtract 1 to get the index
            if (isNaN(itemIndex)) {
                console.log("\nInvalid input. Please enter a valid number.");
                return updateExistingEntry();
            }

            if (itemIndex >= 0 && itemIndex < allEntries.length) {
                const currentEntry = allEntries[itemIndex];
                console.log(`\nEditing Post ${itemIndex + 1}:`);
                console.log(`Current Title: ${currentEntry.title}`);
                console.log(`Current Content: ${currentEntry.content}`);

                inputReader.question(
                    "Enter the new title (leave blank to keep current): ",
                    (updatedTitle) => {
                        inputReader.question(
                            "Enter the new content (leave blank to keep current): ",
                            (updatedContent) => {
                                allEntries[itemIndex] = {
                                    ...currentEntry,
                                    title: updatedTitle || currentEntry.title,
                                    content: updatedContent || currentEntry.content,
                                };
                                storeEntries(allEntries);
                                console.log("Blog post updated successfully!");
                                showMainMenu();
                            },
                        );
                    },
                );
            } else {
                console.log(
                    "\nAlert: Blog post not found. Please enter a valid number.",
                );
                showMainMenu();
            }
        },
    );
};

const removeEntry = () => {
    if (allEntries.length === 0) {
        console.log(
            "\nAlert:  No blog posts found. Please create a new blog post to delete it here.",
        );
        return showMainMenu();
    }

    inputReader.question(
        "Enter the number of the blog post you want to delete: ",
        (inputNumber) => {
            const itemIndex = parseInt(inputNumber, 10) - 1;
            if (isNaN(itemIndex)) {
                console.log("\nInvalid input. Please enter a valid number.");
                return updateExistingEntry();
            }
            if (itemIndex >= 0 && itemIndex < allEntries.length) {
                allEntries.splice(itemIndex, 1);
                storeEntries(allEntries);
                console.log("Blog post deleted successfully!");
            } else {
                console.log(
                    "\nAlert: Blog post not found. Please enter a valid number.",
                );
            }
            showMainMenu();
        },
    );
};

showMainMenu();
