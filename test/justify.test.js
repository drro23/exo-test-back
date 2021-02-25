const justifyTextService = require('../src/api/services/justifyTextService');

describe('justify text', () => {
    it('correctly with 16 lineMaxWidth', () => {
        let res = justifyTextService("hello world to be wonderful", 16);
        expect(res).toEqual("hello  world  to\nbe wonderful    ")
    });

    it('correctly with 80 lineMaxWidth', () => {
        let res = justifyTextService("Lorem Ipsum is simply dummied text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 80)
        expect(res).toEqual("Lorem  Ipsum  is  simply  dummied text of the printing and typesetting industry.\nLorem  Ipsum  has  been  the industry's standard dummy text ever since the 1500s\nwhen  an  unknown  printer took a galley of type and scrambled it to make a type\nspecimen  book.  It has survived not only five centuries, but also the leap into\nelectronic  typesetting,  remaining essentially unchanged. It was popularised in\nthe  1960s  with the release of Letraset sheets containing Lorem Ipsum passages,\nand  more  recently  with  desktop  publishing  software  like  Aldus  PageMaker\nincluding versions of Lorem Ipsum.                                              ")
    })

    it('have exactly 80 characters on a line', () => {
        let res = justifyTextService("Lorem Ipsum is simply dummied text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 80)
        let resLine = res.split('\n')[0];
        expect(resLine.length).toEqual(80)
    })
});
