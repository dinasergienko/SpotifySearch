import fontAwesome from 'font-awesome/css/font-awesome.css';

const { fa, 'fa-question':fa_question, 'fa-music':fa_music, 'fa-play-circle':fa_play, 'fa-pause-circle':fa_pause,
        'fa-repeat':fa_repeat, 'fa-volume-up':fa_volume_up, 'fa-volume-off':fa_volume_off, 'fa-times-circle':fa_close,
        'fa-refresh':fa_reload, 'fa-angle-double-left':fa_left, 'fa-angle-double-right':fa_right, 'fa-user':fa_user,
        'fa-sign-out':fa_sign_out, 'fa-spotify':fa_spotify} = fontAwesome;

const fa_music_icon = [fa, fa_music].join(' ');
const fa_play_icon = [fa, fa_play].join(' ');
const fa_pause_icon = [fa, fa_pause].join(' ');
const fa_repeat_icon = [fa, fa_repeat].join(' ');
const fa_volume_icon = [fa, fa_volume_up].join(' ');
const fa_mute_icon = [fa, fa_volume_off].join(' ');
const fa_close_icon = [fa, fa_close].join(' ');
const fa_reload_icon = [fa, fa_reload].join(' ');
const fa_left_icon = [fa, fa_left].join(' ');
const fa_right_icon = [fa, fa_right].join(' ');
const fa_user_icon = [fa, fa_user].join(' ');
const fa_sign_out_icon = [fa, fa_sign_out].join(' ');
const fa_spotify_icon = [fa, fa_spotify].join(' ');

export {
    fa,
    fa_music_icon,
    fa_play_icon,
    fa_pause_icon,
    fa_repeat_icon,
    fa_volume_icon,
    fa_mute_icon,
    fa_close_icon,
    fa_reload_icon,
    fa_left_icon,
    fa_right_icon,
    fa_user_icon,
    fa_sign_out_icon,
    fa_spotify_icon
}