import { expect } from "chai";
import { formatDate } from "../src/date";

import { makeFilename, make_content } from "../src/note";

describe("makeFilename()", () => {
  let filenameSeperator: string;
  let filenameTemplate: string;

  before(() => {
    filenameSeperator = "_";
    filenameTemplate = "${date}_${title}.md";
  });

  it("should return an empty string, if input are all empty strings", () => {
    const want = "";
    const got = makeFilename("", "", "");
    expect(got).to.equal(want);
  });

  it("should not throw an error, if input are all empty strings", () => {
    const callMakeFilename = () => makeFilename("", "", "");
    expect(callMakeFilename).not.throw();
  });

  it("should fillin the template as expected", () => {
    filenameTemplate = "${date}_${time}_${timeHHmm}_${title}";

    const now = new Date();
    const title = "THIS IS A TEST TITLE!";

    const got = makeFilename(title, filenameSeperator, filenameTemplate, now);

    const want = [
      formatDate.call(now, "YYYYMMDD"),
      formatDate.call(now, "HHmmss"),
      formatDate.call(now, "HHmm"),
      "this_is_a_test_title",
    ].join("_");

    expect(got).to.equal(want);
  });
});

describe("makeContent()", () => {
  it("should return an empty string, if input are all empty strings", () => {
    const want = "";
    const got = make_content("", "");
    expect(got).to.equal(want);
  });

  it("should not throw an error, if input are all empty strings", () => {
    const callMakeContent = () => make_content("", "");
    expect(callMakeContent).not.throw();
  });

  it("should fillin the template as expected", () => {
    const contentTemplate = "${date}\n${title}\n";

    const now = new Date();
    const title = "THIS IS A TEST TITLE!";

    const want = [formatDate.call(now, "YYYY-MM-DD HH-mm"), title, ""].join(
      "\n"
    );
    const got = make_content(title, contentTemplate, now);

    expect(got).to.equal(want);
  });
});
