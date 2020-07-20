const router = require("express").Router();

// Issues model import
const Issue = require("../../models/Issue");

// GET all issues
router.get("/", async (req, res) => {
    try {
        const response = await Issue.find();
        res.json({
            succes: true,
            data: response
        });
    } catch (error) {
        res.status(400).json({ 
            succes: false,
            message: error
        });
    }
});

// GET single issue
router.get("/:id", async (req, res) => {
    try {
        const response = await Issue.findById(req.params.id);
        if (!response) return res.status(404).json({
            succes: false,
            message: `No issue with _id: ${req.params.id}`
        });

        res.json({
            succes: true,
            data: response
        });
    } catch (error) {
        res.status(400).json({ 
            succes: false,
            message: error
        });
    }
});

// POST issue
router.post("/", async (req, res) => {

    const newIssue = new Issue(req.body);
    let error = newIssue.validateSync();

    if (error) return res.status(400).json({
        succes: false,
        message: error.message
    });

    try {
        const response = await Issue.create({
            title: req.body.title,
            description: req.body.description
        });
        res.json({
            succes: true,
            data: response
        })
    } catch (error) {
        res.status(400).json({ 
            succes: false,
            message: error
        });
    }
});

// PUT (update) book
router.put("/:id", async (req, res) => {

    const newIssue = new Issue(req.body);
    let error = await newIssue.validate();

    if (error) return res.status(400).json({
        succes: false,
        message: error.message,
        error: 'yes'
    });

    try {
        const doc = await Issue.findById(req.params.id);
        if (!doc) return res.status(404).json({
            succes: false,
            message: `No issue with _id: ${req.params.id}`
        });

        switch (doc.state) {
            case "open":
                break;
            case "pending":
                if (req.body.state && req.body.state == "open") {
                    return res.status(400).json({
                        succes: false,
                        message: 'Pending issue could only be closed.'
                    })
                }
                break;
            case "closed":
                if (req.body.state && req.body.state !== "closed") {
                    return res.status(400).json({
                        succes: false,
                        message: 'State of once closed issue could not be changed.'
                    })
                }
                break;
        }

        const response = await Issue.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        res.json({
            succes: true,
            data: response
        });
    } catch (error) {
        console.log('?')
        res.status(400).json({ 
            succes: false,
            message: error
        });
    }
});

// DELETE book
router.delete("/:id", async (req, res) => {
    try {
        const response = await Issue.findByIdAndDelete(req.params.id);
        if (!response) return res.status(404).json({
            succes: false,
            message: `No issue with _id: ${req.params.id}`
        });
        res.json({
            succes: true,
            data: response
        });
    } catch (error) {
        res.status(400).json({ 
            succes: false,
            message: error
        });
    }
});

module.exports = router;