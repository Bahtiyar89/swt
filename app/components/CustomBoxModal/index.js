import React from 'react';

import { Button, Dialog, Portal } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const CustomBoxModal = props => {
  const { t } = useTranslation();

  return (
    <>
      {/* //////////////////////////////////////////////////////////////////////// PORTRAL XS */}
      <Portal>
        <Dialog visible={sizeXs} onDismiss={() => seTsizeXs(false)}>
          <Dialog.Title>
            {approximatePrice.length < 10 ? `${t('t:cost')} ` : ''}
            {approximatePrice}
            {approximatePrice.length < 10 ? '$' : ''}
          </Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => seTsizeXs(false)}>{t('t:ok')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={notiXs} onDismiss={() => seTnotiXs(false)}>
          <Dialog.Title>{t('t:notification')} Xs</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => seTnotiXs(false)}>{t('t:ok')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

export default CustomBoxModal;
