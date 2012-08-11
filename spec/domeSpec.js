describe("dome", function () {
    describe("get", function () {
        it("can get elements by id", function () {
            var el = document.getElementById('one');
            expect(dome.get("#one")[0]).toEqual(el);
        });
        it("can get elements by class", function () {
            expect(dome.get(".two").length).toEqual(3);
        });

        it("can get elements by tag name", function () {
            expect(dome.get("b").length).toEqual(4);
        })
        it("creates a dome object from a single node", function () {
            var one = document.getElementById('one');
            expect(dome.get(one)[0]).toBe(one);
        });
        it("creates a dome object from a NodeList", function () {
            var two = $(".two").get();
            expect(dome.get(two)[0]).toBe(two[0]);
        });
    });

    describe("utils", function () {
        it("can loop over each element", function () {
            var o =  {
                loop: function (el) { }
            };
            spyOn(o, 'loop');
            dome.get("b").forEach(o.loop);

            expect(o.loop).toHaveBeenCalled();
        });

        it("can map over each element", function () {
            var a = dome.get("b").map(function (el) {
                return el.className;
            });
            expect(a.join('')).toEqual('twotwotwo');
        });
    });
    describe("text", function () {
        beforeEach(function () {
            this.d = dome.get("#one");
        });
        it("can set the text of an element", function () {
            this.d.text("one");
            expect(this.d[0].innerText).toEqual("one");
        });
        it("can get the text of an element", function () {
            this.d.text("one");
            expect(this.d.text()).toEqual("one");
        });
        afterEach(function () {
            this.d.text("");
        });
    });
    describe("html", function () {
        beforeEach(function () {
            this.d = dome.get(".two");
        });
        afterEach(function () {
            this.d.html("");
        });
        it("can set the html content of an element", function () {
            this.d.html("<strong>Test!</strong>");
            expect(this.d[0].innerHTML.toLowerCase()).toEqual("<strong>test!</strong>");
        });
        it("can get the html content of an element", function () {
            this.d.html("<strong>Test!</strong>");
            expect(this.d.html()[0].toLowerCase()).toEqual("<strong>test!</strong>");
        });
    });
    describe("addClass", function () {
        beforeEach(function () {
            this.d = dome.get(".two");
        });
        afterEach(function () {
            this.d.forEach(function (el) {
                el.className = "two";
            });
        });
        it("can add a single class to elements", function () {
            this.d.addClass('single');
            expect(this.d[0].className.indexOf('single')).toBeGreaterThan(-1);
        });
        it("can add multiple classes (via array) to elements", function () {
            this.d.addClass(["multiple", "classes"]);
            var cn = this.d[0].className;
            expect(cn.indexOf("multiple")).toBeLessThan(cn.indexOf("classes"));
        });
    });
