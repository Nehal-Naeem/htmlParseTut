import * as chai from "chai";
import {expect} from "chai";
import * as chaiAsPromised from "chai-as-promised";
import MemeViewer from "../src/MemeViewer";

describe("MemeViewer", function () {

    before(function () {
        chai.use(chaiAsPromised);
    });


    let memeViewer: MemeViewer = new MemeViewer();

    it("will parse rickroll meme",  () => {
        return expect(memeViewer.fetchMemeData("https://knowyourmeme.com/memes/rickroll")).to.eventually.deep.equal({
            year: 2006,
            image: "https://i.kym-cdn.com/entries/icons/original/000/000/007/bd6.jpg" //FIXME this is likely too brittle
        })
    });

    it("parse grumpy cat meme",  () => {
        return expect(memeViewer.fetchMemeData("https://knowyourmeme.com/memes/grumpy-cat")).to.eventually.deep.equal({
            year: 2012,
            image: "https://i.kym-cdn.com/entries/icons/original/000/011/365/GRUMPYCAT.jpg" //FIXME this is likely too brittle
        })
    });
});
