mintos.com
-
Your task is to create simple RSS reader web application.

##### Task:

1) User registration - form with e-mail and password fields + e-mail verification using ajax.
    * Existence of already registered e-mail should be checked “on the fly” via ajax call when writing e-mail address and before submitting form.
2) Login form with e-mail address and password
3) RSS feed view (Feed source: https://www.theregister.co.uk/software/headlines.atom)
     * After successful login in top section display 10 most frequent words with their respective counts in the whole feed excluding top 50 English common words (taken from here https://en.wikipedia.org/wiki/Most_common_words_in_English)
     * Underneath create list of feed item
     
-------------------   
* There are no restrictions on frameworks (PHP and/or JS) used.
* When doing this task please apply the best practices in software development. Add commits with your code separately from framework code
* Please send the code (archive or link to github) and instructions how to set it up once completed.

### HOW TO SETUP?

##### Requirements

  * [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) >= 18.03.x
  * [Docker-Compose](https://docs.docker.com/compose/install/) >= 1.16.x

##### Install & Run
   
* Clone repository 
  * [git@github.com:MaksimsGee/mintos.git](https://github.com/MaksimsGee/mintos) 
* Run command to setup infrastructure: `docker-compose up --build`
* Access point
  * Frontend: http://127.0.0.1:3000/
  * API: http://127.0.0.1:9000/api

&nbsp;
&nbsp;


##### Additional settings

* Available three different server sides(API)
  * Laravel 6.* (default) -> http://127.0.0.1:9000/api
  * Symfony 4.* -> http://127.0.0.1:9001/api
  * Yii2 -> http://127.0.0.1:9002/api | `API not finished due to lack of time`

To launch app with different API add `${API_URL}`(dont forget to specify full path `/api`) in docker-compose command

Command sample: `API_URL=http://127.0.0.1:9001/api docker-composer up --build`  

To re-run migrations following file should be removed from your local machine `$PWD/docker/.builded`

Command sample: `rm $PWD/docker/.builded`

&nbsp;
&nbsp;

`*** if ${FORCE_FRESH:-false} session and user is not shared between API as each framework has it own encryption/hashing for jwt token/password, so when you switch api you need to logout/register/login`

&nbsp;
&nbsp;

**Coded by [Maksims Gerasimovs](https://github.com/MaksimsGee)**\
**Powered by [mintos.com](https://www.mintos.com/en/)** 
