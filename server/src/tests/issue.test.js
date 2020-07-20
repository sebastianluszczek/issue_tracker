const mongoose = require('mongoose');
const Issue = require('../models/Issue');
const supertest = require('supertest');

const app = require('../app')

const request = supertest(app);

describe('Issue Model Test', () => {

    let connection;

    // Connect to the MongoDB Memory Server 
    beforeAll(async () => {
        connection = await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await connection.close();
        done();
    });

    it('create & save issue successfully', async () => {
        const validIssue = new Issue({
            title: "Issue one",
            description: "Description of issue one."
        });
        const savedIssue = await validIssue.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedIssue._id).toBeDefined();
        expect(savedIssue.title).toBe("Issue one");
        expect(savedIssue.description).toBe("Description of issue one.");
        expect(savedIssue.state).toBe("open");
        expect(savedIssue.created_at).toBeDefined();
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert issue successfully, but the field does not defined in schema should be undefined', async () => {
        const issueWithInvalidField = new Issue({
            title: "Issue with error",
            description: "Description of issue.",
            country: "Poland"
        });
        const savedIssueWithInvalidField = await issueWithInvalidField.save();
        expect(savedIssueWithInvalidField._id).toBeDefined();
        expect(savedIssueWithInvalidField.country).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('create user without required field should failed', async () => {
        const issueWithoutRequiredField = new Issue({ title: 'Issue' });
        let err;
        try {
            const savedIssueWithoutRequiredField = await issueWithoutRequiredField.save();
            error = savedIssueWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.description).toBeDefined();
    });

});

describe('API Test', () => {

    let connection;

    // Connect to the MongoDB Memory Server 
    beforeAll(async () => {
        connection = await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await connection.close();
        done();
    });

    it('should be able to create issue', async () => {
        const response = await request.post('/api/issues').send({
            title: "Issue one",
            description: "Description of issue one."
        });

        expect(response.status).toBe(200);
    });

    it('should be able to delete issue', async () => {
        const issue = new Issue({
            title: "Issue one",
            description: "Description of issue one."
        });
        await issue.save();

        const response = await request.delete(`/api/issues/${issue._id}`).send();

        expect(response.status).toBe(200);
    });

    it('should be able to update issue title or description', async () => {
        const issue = new Issue({
            title: "Issue one",
            description: "Description of issue one."
        });
        await issue.save();

        const response = await request.put(`/api/issues/${issue._id}`).send({
            title: "Issue one updated",
            description: "Description of issue one."
        });

        expect(response.status).toBe(200);
    });

    it('should not be able to change issue status from "pending" to "open"', async () => {
        const issue = new Issue({
            title: "Issue one",
            description: "Description of issue one."
        });
        await issue.save();
        await issue.update({
            title: "Issue one",
            description: "Description of issue one.",
            state: "pending"
        })

        const response = await request.put(`/api/issues/${issue._id}`).send({
            title: "Issue one updated",
            description: "Description of issue one.",
            state: "open"
        });

        expect(response.status).toBe(400);
    });

    it('should not be able to change "closed" issue status', async () => {
        const issue = new Issue({
            title: "Issue one",
            description: "Description of issue one."
        });
        await issue.save();
        await issue.update({
            title: "Issue one",
            description: "Description of issue one.",
            state: "closed"
        })

        const response = await request.put(`/api/issues/${issue._id}`).send({
            title: "Issue one updated",
            description: "Description of issue one.",
            state: "pending"
        });

        expect(response.status).toBe(400);
    });
});