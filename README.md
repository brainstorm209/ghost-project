# rinne

A Ghost CMS theme.


## Requirements

Ghost `5.9.0` or higher


## Config

The package.json file contains the basic configuration like `posts_per_page` 
and responsive image sizes and a list of custom settings you can change from the Ghost Admin.


## Install

To install the theme do the following:
1. Upload the theme zip file in your Ghost Admin.
- check out the [official guide](https://ghost.org/help/installing-a-theme/) for more details.

2. Upload the `routes.yaml` file.
- Go to `Settings > Labs > Routes`

3. Adjust the Custom Settings
- Custom settings are split into 3 categories: Site-wide, Homepage and Post
- Go to `Design > Site-wide` / `Design > Homepage` / `Design > Post` 

Additionally, you can change some global CSS settings in the `theme-settings.hbs` file in the partials directory.

Check out the [official theme documentation](https://bironthemes.com/docs/rinne-ghost/) for more information and details.


## Development

The development environment consists of several gulp tasks.
1. `gulp css`
Process the css files from 'assets/css' folder into a single file using PostCSS 
that will be used by the theme.

2. `gulp js`
Compile the js files from 'assets/js' folder into a single file that will 
be used by the theme.

3. `gulp zip`
This task compresses the theme files into theme_name.zip in the 'dist' folder.

4. The deafault task `gulp` or `gulp dev`.
Runs a series of tasks necessary for local development/customizing.


## Demo

[https://rinne.bironthemes.com/](https://rinne.bironthemes.com/)


## Documentation

[https://bironthemes.com/docs/rinne-ghost/](https://bironthemes.com/docs/rinne-ghost/)


## Help

[https://bironthemes.com/contact/](https://bironthemes.com/contact/)
