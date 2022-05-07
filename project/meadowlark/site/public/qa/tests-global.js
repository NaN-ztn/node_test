// 默认界面是行为驱动开发（BDD），它让你以行为的方式思考。在BDD中，你描述组件和它们的行为，然后用测试去验证这些行为。
// 测试驱动开发（TDD）更具可行性，你描述的是测试集和其中的测试。
suite('Global Tests', function () {
  test('page has a valid title', function () {
    assert(document.title && document.title.match(/\S/) &&
      document.title.toUpperCase() !== 'TODO');
  });
});
