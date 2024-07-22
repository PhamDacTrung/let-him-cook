import * as pluralize from 'pluralize';
import { DefaultNamingStrategy } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class NamingStrategy extends DefaultNamingStrategy {
  // eslint-disable-next-line class-methods-use-this
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName || pluralize(snakeCase(targetName));
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.join('_')) +
      (customName || snakeCase(propertyName))
    );
  }
}
