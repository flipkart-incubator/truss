module.exports = {
    "Basic Truss Application Loads": function (browser) {
        browser
            .url("http://127.0.0.1:8080/basic-app/")
			.waitForElementVisible('body', 1000)
			.waitForElementVisible('#app-container', 2000)
			.waitForElementVisible('#header-container', 2000)
			.assert.containsText("#header-container h3", "Header")
			.waitForElementVisible('#content-container', 2000)
			.assert.containsText("#content-container section", "Content")
			.waitForElementVisible('#footer-container', 2000)
			.assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss initOn works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/initon-app/")
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .waitForElementVisible('#content-container', 3500)
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 3500)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss listensTo 'KEEP_ON' works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/listensto-app-keep_on/")
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .click("#emitter")
            .click("#emitter")
            .click("#emitter")
            .waitForElementVisible('#content-container', 3500)
            .click("#emitter")
            .elements("css selector",".timestamp-list li", function(result){
                browser.assert.equal(result.value.length, 4);
            })
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss listensTo 'PLAY_AFTER_RENDER' works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/listensto-app-play_after_render/")
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .click("#emitter")
            .click("#emitter")
            .click("#emitter")
            .waitForElementVisible('#content-container', 3500)
            .click("#emitter")
            .elements("css selector",".timestamp-list li", function(result){
                browser.assert.equal(result.value.length, 1);
            })
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss listensTo 'REPLAY' works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/listensto-app-replay/")
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .click("#emitter")
            .click("#emitter")
            .click("#emitter")
            .waitForElementVisible('#content-container', 3500)
            .click("#emitter")
            .elements("css selector",".timestamp-list li", function(result){
                browser.assert.equal(result.value.length, 4);
            })
            .assert.containsText("#content-container section", "Content")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer")
            .end();
    },

    "Truss resolveRenderOn, onRenderCompelete & destroy works": function (browser) {
        browser
            .url("http://127.0.0.1:8080/resolve-render-%26-after-render//")
            .waitForElementVisible('body', 1000)
            .waitForElementVisible('#app-container', 100)
            .waitForElementVisible('#header-container', 100)
            .assert.containsText("#header-container h3", "Header")
            .waitForElementVisible('#content-container', 100)
            .assert.containsText("#content-container .promise-response", "Name: Value")
            .waitForElementVisible('#footer-container', 100)
            .assert.containsText("#footer-container footer", "Footer");

        browser.expect.element('#content-container').to.not.be.present.after(6000);
        browser.end();
    }
};
