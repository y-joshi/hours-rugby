/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Home', // name that appear in Sidebar
  },
  {
    path: '/app/tasks',
    icon: 'FormsIcon',
    name: 'Tasks',
  },
  {
    path: '/app/subjects',
    icon: 'LocalLibraryRounded',
    name: 'Subjects',
  },
]

export default routes
