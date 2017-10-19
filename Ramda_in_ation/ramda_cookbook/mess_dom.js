// Get all descendants that match selector
// Note: NodeList is array-like so you can run ramda list functions on it
//  cssQuery :: String -> Node -> NodeList
var cssQuery = R.invoker(1, 'querySelectorAll')
var setStyle = R.assoc('style')

R.pipe(
    cssQuery('a, p'),
    R.map(setStyle({ color: 'red' }))
)

var sliceFrom = R.invoker(1, 'slice')
sliceFrom(6, 'abcdefghijklm')
var sliceFrom6 = R.invoker(2, 'slice')(6)
sliceFrom6(8, 'abcdefghijklm')