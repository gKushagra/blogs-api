const { v4: uuid } = require('uuid');

class Blog {
    constructor(blog) {
        this.id = uuid();
        this.title = blog.title;
        this.description = blog.description;
        this.author = new Author(blog.author);
        this.lastUpdated = blog.lastUpdated != null ? blog.lastUpdated : Date.now();
        this.content = blog.content;
    }

    // make generic
    isValid() {
        if (!this.title || this.title == null || this.title == undefined)
            return false;
        if (!this.description || this.description == null || this.description == undefined)
            return false;
        if (!this.content || this.content == null || this.content == undefined)
            return false;
        if (!this.author || this.author == null || this.author == undefined
            || !('id' in this.author) || !('fullname' in this.author))
            return false;
        return true;
    }
}

class Author {
    constructor(author = {}) {
        this.id = author.id;
        this.fullname = author.fullname;
    }
}

module.exports = Blog;
