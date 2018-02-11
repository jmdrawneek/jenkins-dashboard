import Mozaik from 'mozaik';
import config from '../config';
import github from 'mozaik-ext-github/client';
import jenkins from 'mozaik-ext-jenkins/client';

const mozaik = new Mozaik(config);

mozaik.bus.registerApi('github', github);
mozaik.bus.registerApi('jenkins', jenkins);

mozaik.startServer();
