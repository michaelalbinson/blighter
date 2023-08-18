'use strict';

import FileHeaderContent from "./FileHeaderContent";

export default interface Note extends FileHeaderContent{
    id: number,
    url: string,
    content: string
};