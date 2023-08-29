/** EXT runtime module. */
declare namespace ext.runtime {

  /** Platform information. */
  export interface PlatformInfo {
    /** Operating system. */
    os: 'mac' | 'windows' | 'linux'
    /** CPU architecture. */
    arch: 'arm' | 'arm64' | 'x86-32' | 'x86-64'
  }

  /** Update check return value. */
  export interface UpdateCheck {
    /** Status of the update check. */
    status: 'no_update' | 'update_available'
    /** Update information. */
    details: EventUpdate | undefined
  }

  /** Update event. */
  export interface EventUpdate {
    /** Version string. */
    version: string
    /** User friendly version name if available. */
    version_name: string | undefined
  }

  /** Permission event. */
  export interface EventPermission {
    /** Module ID. */
    module: string
    /** Permission key. */
    permission: string
  }

  /** Module event. */
  export interface EventModule {
    /** Module ID. */
    id: string
    /** Module install path if available. */
    path: string | undefined
  }

  /** Message event. */
  export interface EventMessage {
    /** Sender extension ID. */
    extension: string
  }

  /** Event handler. */
  interface EventHandler<Listener> {
    /**
     * Register listener.
     * @param listener Listener to invoke.
     */
    addListener: (listener: Listener) => void
    /**
     * Unregister listener.
     * @param listener Listener to unregister.
     */
    removeListener: (listener: Listener) => void
  }

  /**
   * Get extension manifest.
   * @returns Extension manifest.
   */
  export function getManifest(): Promise<any>

  /**
   * Get platform information.
   * @returns Platform information.
   */
  export function getPlatformInfo(): Promise<PlatformInfo>

  /**
   * Reload extension.
   * The promise resolves after the reload is successfully requested.
   */
  export function reload(): Promise<void>

  /**
   * Check for extension updates.
   * @returns The promise resolves with the update check result.
   */
  export function requestUpdateCheck(): Promise<UpdateCheck>

  /**
   * Get all loaded module ID's.
   * @returns The promise resolves with an array of all loaded module ID's.
   */
  export function getModules(): Promise<string[]>

  /**
   * Get all granted permissions for all modules.
   * @returns The promise resolves with an object that contains a granted permission array for each module.
   */
  export function getPermissions(): Promise<{[module: string]: string[]}>

  /**
   * Send a message to an extension.
   * @param message Message object to send.
   * @returns The promise resolves when the message is sent.
   */
  export function sendMessage(message: any): Promise<void>
  
  /** Called when the extension is installed. */
  export const onInstall: EventHandler<() => void>

  /** Called before the extension is uninstalled. */
  export const onUninstall: EventHandler<() => void>

  /** Called when the extension is enabled. */
  export const onEnable: EventHandler<() => void>

  /** Called when the extension is disabled. */
  export const onDisable: EventHandler<() => void>

  /** Called when an extension update is available. */
  export const onUpdateAvailable: EventHandler<(event: EventUpdate) => void>

  /** Called when a permission has been granted. */
  export const onPermissionGrant: EventHandler<(event: EventPermission) => void>

  /** Called when a permission has been revoked. */
  export const onPermissionRevoke: EventHandler<(event: EventPermission) => void>
  
  /** Called when a module has been loaded. */
  export const onModuleLoad: EventHandler<(event: EventModule) => void>

  /** Called when a module has been unloaded. */
  export const onModuleUnload: EventHandler<(event: EventModule) => void>

  /** Called when an extension is clicked in the dashboard. */
  export const onExtensionClick: EventHandler<() => void>

  /** Called when an extension message is received. */
  export const onMessage: EventHandler<(event: EventMessage, message: any) => void>
  
}
